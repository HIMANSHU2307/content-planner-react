/**
 * ListView Organism Component
 * 
 * Displays posts in a simple list/grid layout.
 */

import React from 'react';
import { Post, Channel } from '@/types';
import { PostCard } from '@/components/molecules/PostCard';
import styles from './ListView.module.scss';

export interface ListViewProps {
  posts: Post[];
  channels: Channel[];
  onEdit?: (post: Post) => void;
  onDelete?: (postId: string) => void;
}

/**
 * ListView Component
 * 
 * Displays posts in a responsive grid layout
 */
export const ListView: React.FC<ListViewProps> = ({
  posts,
  channels,
  onEdit,
  onDelete,
}) => {
  if (posts.length === 0) {
    return (
      <div className={styles.listView__empty}>
        <p>No posts found. Create a new post to get started!</p>
      </div>
    );
  }

  return (
    <div className={styles.listView}>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          channels={channels}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

