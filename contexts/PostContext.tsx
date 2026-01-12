import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react'; 
import {PostContextType } from '@/types/post';
import { API } from '@/config/api';


interface ImageProviderProps {
  children: ReactNode;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider = ({children}: ImageProviderProps) => {
  const [backendPosts, setBackendPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try{
        const response = await fetch(`${API.BASE_URL}/api/imagekit/get-all-posts`);

        if(!response.ok){
           throw new Error("Failed to fetch posts");
        }

        const data = await response.json();
        setBackendPosts(data.posts);
      }catch(err){
        console.log('Error fetching posts', err)
      }
    } 

    fetchPosts();
  },[]);

    const value = {backendPosts};

    return (
        <PostContext.Provider value={value}>
            {children}
        </PostContext.Provider>
    );
};

export const usePostContext = () => {
    const context = useContext(PostContext);
    if (!context) {
        throw new Error('usePostContext must be used within an PostProvider');
    }
    return context;
};