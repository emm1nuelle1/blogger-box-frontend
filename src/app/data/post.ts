import { Category } from './category';

export interface Post {
  id: string;
  title: string;
  content: string;
  category: Category;
  createdDate: string;
}

export type PostFormValue = Omit<Post, 'id' | 'createdDate' | 'category'> & {
  categoryId: string;
};
