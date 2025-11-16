/**
 * SummaryWidget Organism Component
 * 
 * Displays key statistics and metrics about content planning.
 * Shows counts by status, upcoming posts, and channel distribution.
 */

import React from 'react';
import { Post, Channel } from '@/types';
import { format, isAfter, startOfToday } from 'date-fns';
import styles from './SummaryWidget.module.scss';

export interface SummaryWidgetProps {
  posts: Post[];
  channels: Channel[];
}

/**
 * SummaryWidget Component
 * 
 * Calculates and displays:
 * - Total posts count
 * - Posts by status
 * - Upcoming scheduled posts
 * - Channel distribution
 */
export const SummaryWidget: React.FC<SummaryWidgetProps> = ({ posts, channels }) => {
  // Calculate statistics
  const totalPosts = posts.length;
  const postsByStatus = posts.reduce(
    (acc, post) => {
      acc[post.status] = (acc[post.status] || 0) + 1;
      return acc;
    },
    {} as Record<Post['status'], number>
  );

  // Count upcoming scheduled posts
  const upcomingPosts = posts.filter((post) => {
    if (!post.publishDate) return false;
    const publishDate = new Date(post.publishDate);
    return isAfter(publishDate, startOfToday());
  }).length;

  // Channel distribution
  const channelDistribution = posts.reduce((acc, post) => {
    post.channelIds.forEach((channelId) => {
      acc[channelId] = (acc[channelId] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const statCards = [
    {
      label: 'Total Posts',
      value: totalPosts,
      color: '#3b82f6',
    },
    {
      label: 'Drafts',
      value: postsByStatus.draft || 0,
      color: '#6b7280',
    },
    {
      label: 'Scheduled',
      value: postsByStatus.scheduled || 0,
      color: '#3b82f6',
    },
    {
      label: 'Published',
      value: postsByStatus.published || 0,
      color: '#10b981',
    },
    {
      label: 'Upcoming',
      value: upcomingPosts,
      color: '#f59e0b',
    },
  ];

  return (
    <div className={styles.summaryWidget}>
      <h2 className={styles.summaryWidget__title}>Content Overview</h2>

      <div className={styles.summaryWidget__stats}>
        {statCards.map((stat) => (
          <div key={stat.label} className={styles.statCard}>
            <div
              className={styles.statCard__indicator}
              style={{ backgroundColor: stat.color }}
            />
            <div className={styles.statCard__content}>
              <div className={styles.statCard__value}>{stat.value}</div>
              <div className={styles.statCard__label}>{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {Object.keys(channelDistribution).length > 0 && (
        <div className={styles.summaryWidget__channels}>
          <h3 className={styles.summaryWidget__subtitle}>Channel Distribution</h3>
          <div className={styles.channelList}>
            {Object.entries(channelDistribution).map(([channelId, count]) => {
              const channel = channels.find((c) => c.id === channelId);
              if (!channel) return null;

              return (
                <div key={channelId} className={styles.channelItem}>
                  <div
                    className={styles.channelItem__color}
                    style={{ backgroundColor: channel.color }}
                  />
                  <span className={styles.channelItem__name}>{channel.name}</span>
                  <span className={styles.channelItem__count}>{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

