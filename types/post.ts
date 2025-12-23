export interface Post {
  id: string;
  title: string;
  description: string;
  images: string[]; // Array of image URLs
  category: string[];
}

export interface PostContextType {
  posts: Post[];
  // Add more properties/functions as your context grows
  // For example:
  // addImage?: (image: ImagePost) => void;
  // deleteImage?: (id: string) => void;
  // updateImage?: (id: string, updates: Partial<ImagePost>) => void;
}
