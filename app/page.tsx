/**
 * Main Page Component
 * 
 * The primary application page that brings together all components.
 * Handles state management, API calls, and user interactions.
 */

'use client';

import React, { useState, useMemo } from 'react';
import { Post, PostStatus, ViewMode } from '@/types';
import {
  useGetPostsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} from '@/store/apis/postsApi';
import { useGetChannelsQuery } from '@/store/apis/channelsApi';
import { useGetCampaignsQuery } from '@/store/apis/campaignsApi';
import { SummaryWidget } from '@/components/organisms/SummaryWidget';
import { SearchBar } from '@/components/organisms/SearchBar';
import { ViewSwitcher } from '@/components/organisms/ViewSwitcher';
import { ListView } from '@/components/organisms/ListView';
import { CalendarView } from '@/components/organisms/CalendarView';
import { Modal } from '@/components/organisms/Modal';
import { PostForm } from '@/components/molecules/PostForm';
import { Button } from '@/components/atoms/Button';
import styles from './page.module.scss';

export default function Home() {
  // View state
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<PostStatus[]>([]);
  const [channelFilter, setChannelFilter] = useState<string[]>([]);
  const [campaignFilter, setCampaignFilter] = useState<string[]>([]);

  // API queries
  const { data: posts = [], isLoading: postsLoading } = useGetPostsQuery();
  const { data: channels = [], isLoading: channelsLoading } = useGetChannelsQuery();
  const { data: campaigns = [], isLoading: campaignsLoading } = useGetCampaignsQuery();

  // Mutations
  const [createPost, { isLoading: isCreating }] = useCreatePostMutation();
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();

  // Filter posts based on search and filters
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          post.title.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Status filter
      if (statusFilter.length && !statusFilter.includes(post.status)) {
        return false;
      }

      // Channel filter
      if (
        channelFilter.length &&
        !channelFilter.some((channelId) => post.channelIds.includes(channelId))
      ) {
        return false;
      }

      // Campaign filter
      if (
        campaignFilter.length &&
        (!post.campaignId || !campaignFilter.includes(post.campaignId))
      ) {
        return false;
      }

      return true;
    });
  }, [posts, searchQuery, statusFilter, channelFilter, campaignFilter]);

  // Handle form submission
  const handleSubmit = async (data: Partial<Post>) => {
    try {
      if (editingPost) {
        await updatePost({ id: editingPost.id, data }).unwrap();
      } else {
        await createPost(data).unwrap();
      }
      setShowForm(false);
      setEditingPost(null);
    } catch (error) {
      console.error('Error saving post:', error);
      // In a real app, you'd show an error toast/notification here
    }
  };

  // Handle edit
  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setShowForm(true);
  };

  // Handle delete
  const handleDelete = async (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(postId).unwrap();
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  // Handle cancel
  const handleCancel = () => {
    setShowForm(false);
    setEditingPost(null);
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter([]);
    setChannelFilter([]);
    setCampaignFilter([]);
  };

  const isLoading = postsLoading || channelsLoading || campaignsLoading;

  return (
    <main className={styles.main}>
      <div className={styles.main__container}>
        <header className={styles.header}>
          <div className={styles.header__top}>
            <h1 className={styles.header__title}>Content Planner</h1>
            <div className={styles.header__actions}>
              <ViewSwitcher currentView={viewMode} onViewChange={setViewMode} />
              <Button
                onClick={() => {
                  setEditingPost(null);
                  setShowForm(true);
                }}
                disabled={showForm}
              >
                + New Post
              </Button>
            </div>
          </div>
        </header>

        {isLoading ? (
          <div className={styles.loading}>
            <p>Loading...</p>
          </div>
        ) : (
          <>
            <SummaryWidget posts={posts} channels={channels} />

            <div className={styles.content}>
              <div className={styles.content__main}>
                <SearchBar
                  searchQuery={searchQuery}
                  statusFilter={statusFilter}
                  channelFilter={channelFilter}
                  campaignFilter={campaignFilter}
                  channels={channels}
                  campaigns={campaigns}
                  onSearchChange={setSearchQuery}
                  onStatusFilterChange={setStatusFilter}
                  onChannelFilterChange={setChannelFilter}
                  onCampaignFilterChange={setCampaignFilter}
                  onClearFilters={handleClearFilters}
                />

                <div className={styles.postsSection}>
                  {viewMode === 'list' ? (
                    <ListView
                      posts={filteredPosts}
                      channels={channels}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ) : (
                    <CalendarView
                      posts={filteredPosts}
                      channels={channels}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        <Modal
          isOpen={showForm}
          title={editingPost ? 'Edit Post' : 'Create New Post'}
          onClose={handleCancel}
        >
          <PostForm
            post={editingPost || undefined}
            channels={channels}
            campaigns={campaigns}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={isCreating || isUpdating}
          />
        </Modal>
      </div>
    </main>
  );
}

