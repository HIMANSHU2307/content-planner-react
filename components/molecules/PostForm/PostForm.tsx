/**
 * PostForm Molecule Component
 * 
 * A form for creating and editing posts.
 * Handles validation and submission.
 */

import React, { useState, useEffect } from 'react';
import { Post, Channel, Campaign } from '@/types';
import { Input } from '@/components/atoms/Input';
import { Textarea } from '@/components/atoms/Textarea';
import { Select, SelectOption } from '@/components/atoms/Select';
import { Button } from '@/components/atoms/Button';
import styles from './PostForm.module.scss';

export interface PostFormProps {
  post?: Post;
  channels: Channel[];
  campaigns: Campaign[];
  onSubmit: (data: Partial<Post>) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

/**
 * PostForm Component
 * 
 * @param post - Existing post data for editing (optional)
 * @param channels - Available channels for selection
 * @param campaigns - Available campaigns for selection
 * @param onSubmit - Callback when form is submitted
 * @param onCancel - Callback when form is cancelled
 * @param isLoading - Loading state
 */
export const PostForm: React.FC<PostFormProps> = ({
  post,
  channels,
  campaigns,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<Partial<Post>>({
    title: post?.title || '',
    content: post?.content || '',
    status: post?.status || 'draft',
    channelIds: post?.channelIds || [],
    campaignId: post?.campaignId || null,
    publishDate: post?.publishDate || null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Update form data when post prop changes
  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        content: post.content,
        status: post.status,
        channelIds: post.channelIds,
        campaignId: post.campaignId,
        publishDate: post.publishDate,
      });
    }
  }, [post]);

  const handleChange = (field: keyof Post, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleChannelToggle = (channelId: string) => {
    setFormData((prev) => {
      const currentIds = prev.channelIds || [];
      const newIds = currentIds.includes(channelId)
        ? currentIds.filter((id) => id !== channelId)
        : [...currentIds, channelId];
      return { ...prev, channelIds: newIds };
    });
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title?.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.content?.trim()) {
      newErrors.content = 'Content is required';
    }

    if (formData.channelIds?.length === 0) {
      newErrors.channelIds = 'At least one channel must be selected';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const statusOptions: SelectOption[] = [
    { value: 'draft', label: 'Draft' },
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'published', label: 'Published' },
    { value: 'archived', label: 'Archived' },
  ];

  const campaignOptions: SelectOption[] = [
    { value: '', label: 'No Campaign' },
    ...campaigns.map((c) => ({ value: c.id, label: c.name })),
  ];

  return (
    <form onSubmit={handleSubmit} className={styles.postForm}>
      <Input
        label="Title"
        value={formData.title || ''}
        onChange={(e) => handleChange('title', e.target.value)}
        error={errors.title}
        required
      />

      <Textarea
        label="Content"
        value={formData.content || ''}
        onChange={(e) => handleChange('content', e.target.value)}
        error={errors.content}
        rows={6}
        required
      />

      <Select
        label="Status"
        value={formData.status || 'draft'}
        onChange={(e) => handleChange('status', e.target.value)}
        options={statusOptions}
      />

      <div className={styles.postForm__section}>
        <label className={styles.postForm__label}>Channels</label>
        <div className={styles.postForm__channels}>
          {channels.map((channel) => (
            <label key={channel.id} className={styles.channelCheckbox}>
              <input
                type="checkbox"
                checked={formData.channelIds?.includes(channel.id) || false}
                onChange={() => handleChannelToggle(channel.id)}
              />
              <span
                className={styles.channelCheckbox__label}
                style={{ '--channel-color': channel.color } as React.CSSProperties}
              >
                {channel.name}
              </span>
            </label>
          ))}
        </div>
        {errors.channelIds && (
          <span className={styles.postForm__error}>{errors.channelIds}</span>
        )}
      </div>

      <Select
        label="Campaign"
        value={formData.campaignId || ''}
        onChange={(e) => handleChange('campaignId', e.target.value || null)}
        options={campaignOptions}
        helperText="Optional: Associate this post with a campaign"
      />

      <Input
        label="Publish Date"
        type="datetime-local"
        value={formData.publishDate ? new Date(formData.publishDate).toISOString().slice(0, 16) : ''}
        onChange={(e) => handleChange('publishDate', e.target.value ? new Date(e.target.value).toISOString() : null)}
        helperText="Schedule when this post should be published"
      />

      <div className={styles.postForm__actions}>
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" isLoading={isLoading}>
          {post ? 'Update Post' : 'Create Post'}
        </Button>
      </div>
    </form>
  );
};

