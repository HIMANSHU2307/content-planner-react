/**
 * CalendarView Organism Component
 * 
 * Displays posts in a calendar format grouped by date.
 * Shows scheduled and published posts on their respective dates.
 */

import React, { useMemo } from 'react';
import { format, parseISO, startOfDay, isSameDay } from 'date-fns';
import { Post, Channel } from '@/types';
import { PostCard } from '@/components/molecules/PostCard';
import styles from './CalendarView.module.scss';

export interface CalendarViewProps {
  posts: Post[];
  channels: Channel[];
  onEdit?: (post: Post) => void;
  onDelete?: (postId: string) => void;
}

/**
 * CalendarView Component
 * 
 * Groups posts by their publish date and displays them in a calendar layout
 */
export const CalendarView: React.FC<CalendarViewProps> = ({
  posts,
  channels,
  onEdit,
  onDelete,
}) => {
  // Group posts by date
  const postsByDate = useMemo(() => {
    const grouped: Record<string, Post[]> = {};

    posts.forEach((post) => {
      // Use publish date if available, otherwise use created date
      const dateKey = post.publishDate
        ? format(parseISO(post.publishDate), 'yyyy-MM-dd')
        : format(parseISO(post.createdAt), 'yyyy-MM-dd');

      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(post);
    });

    // Sort dates
    return Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b));
  }, [posts]);

  if (postsByDate.length === 0) {
    return (
      <div className={styles.calendarView__empty}>
        <p>No posts scheduled. Create a new post to get started!</p>
      </div>
    );
  }

  return (
    <div className={styles.calendarView}>
      {postsByDate.map(([dateKey, datePosts]) => {
        const date = parseISO(dateKey);
        const isToday = isSameDay(date, new Date());

        return (
          <div key={dateKey} className={styles.calendarView__day}>
            <div className={styles.calendarView__dayHeader}>
              <h3 className={styles.calendarView__dayTitle}>
                {format(date, 'EEEE, MMMM dd, yyyy')}
                {isToday && <span className={styles.calendarView__todayBadge}>Today</span>}
              </h3>
              <span className={styles.calendarView__dayCount}>
                {datePosts.length} {datePosts.length === 1 ? 'post' : 'posts'}
              </span>
            </div>
            <div className={styles.calendarView__dayPosts}>
              {datePosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  channels={channels}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

