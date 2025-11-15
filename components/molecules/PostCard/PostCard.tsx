/**
 * PostCard Molecule Component
 * 
 * Displays a post in a card format with status, channels, and actions.
 * Used in list views to show post information.
 */

import React from 'react';
import { format } from 'date-fns';
import { Post, Channel } from '@/types';
import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import styles from './PostCard.module.scss';

export interface PostCardProps {
  post: Post;
  channels: Channel[];
  onEdit?: (post: Post) => void;
  onDelete?: (postId: string) => void;
}

/**
 * PostCard Component
 * 
 * @param post - Post data to display
 * @param channels - Array of all channels for lookup
 * @param onEdit - Callback when edit button is clicked
 * @param onDelete - Callback when delete button is clicked
 */
export const PostCard: React.FC<PostCardProps> = ({
  post,
  channels,
  onEdit,
  onDelete,
}) => {
  // Get channel names for display
  const postChannels = post.channelIds
    .map((id) => channels.find((c) => c.id === id))
    .filter(Boolean) as Channel[];

  // Status badge variant mapping
  const statusVariantMap: Record<Post['status'], 'default' | 'success' | 'warning' | 'danger' | 'info'> = {
    draft: 'default',
    scheduled: 'info',
    published: 'success',
    archived: 'warning',
  };

  return (
    <div className={styles.postCard}>
      <div className={styles.postCard__header}>
        <h3 className={styles.postCard__title}>{post.title}</h3>
        <Badge variant={statusVariantMap[post.status]}>
          {post.status}
        </Badge>
      </div>

      <p className={styles.postCard__content}>{post.content}</p>

      <div className={styles.postCard__meta}>
        {postChannels.length > 0 && (
          <div className={styles.postCard__channels}>
            {postChannels.map((channel) => (
              <span
                key={channel.id}
                className={styles.channelTag}
                style={{ backgroundColor: `${channel.color}20`, color: channel.color }}
              >
                {channel.name}
              </span>
            ))}
          </div>
        )}

        {post.publishDate && (
          <div className={styles.postCard__date}>
            <span className={styles.postCard__dateLabel}>Publish:</span>
            <span>{format(new Date(post.publishDate), 'MMM dd, yyyy')}</span>
          </div>
        )}
      </div>

      {(onEdit || onDelete) && (
        <div className={styles.postCard__actions}>
          {onEdit && (
            <Button variant="secondary" size="small" onClick={() => onEdit(post)}>
              Edit
            </Button>
          )}
          {onDelete && (
            <Button variant="danger" size="small" onClick={() => onDelete(post.id)}>
              Delete
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

