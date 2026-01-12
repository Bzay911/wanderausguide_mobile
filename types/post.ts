export interface Post {
  _id: string;
  placeName: string;
  description: string;
  images: string[]; 
  category: string[];
}

export interface PostContextType {
  backendPosts: Post[];
}
