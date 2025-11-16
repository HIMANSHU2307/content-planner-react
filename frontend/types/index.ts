/**
 * Type Definitions for Content Planner
 * 
 * Centralized type definitions for all entities and shared types.
 * This ensures type safety across the entire application.
 */

/**
 * Post Status Enum
 * Defines the possible states a post can be in
 */
export type PostStatus = 'draft' | 'scheduled' | 'published' | 'archived';

/**
 * Channel Type Enum
 * Categorizes different types of content channels
 */
export type ChannelType = 'social' | 'professional' | 'content' | 'email';

/**
 * Campaign Status Enum
 * Tracks the lifecycle of marketing campaigns
 */
export type CampaignStatus = 'planning' | 'active' | 'paused' | 'completed';

/**
 * Schedule Status Enum
 * Indicates the status of scheduled content
 */
export type ScheduleStatus = 'pending' | 'published' | 'failed';

/**
 * Post Entity
 * Represents a piece of content that can be published across multiple channels
 */
export interface Post {
  id: string;
  title: string;
  content: string;
  status: PostStatus;
  channelIds: string[]; // Array of channel IDs this post is assigned to
  campaignId: string | null; // Optional campaign association
  publishDate: string | null; // ISO date string for scheduled publishing
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

/**
 * Channel Entity
 * Represents a platform or medium where content can be published
 */
export interface Channel {
  id: string;
  name: string;
  type: ChannelType;
  color: string; // Hex color code for UI representation
}

/**
 * Campaign Entity
 * Groups related posts together for marketing initiatives
 */
export interface Campaign {
  id: string;
  name: string;
  description: string;
  status: CampaignStatus;
}

/**
 * Schedule Entity
 * Represents a scheduled publication of a post to a specific channel
 */
export interface Schedule {
  id: string;
  postId: string;
  channelId: string;
  scheduledDate: string; // ISO date string
  status: ScheduleStatus;
  createdAt: string; // ISO date string
}

/**
 * API Response Wrapper
 * Standard response format for API calls
 */
export interface ApiResponse<T> {
  data: T;
  error?: string;
}

/**
 * Filter Options for Posts
 * Used for filtering and searching posts
 */
export interface PostFilters {
  statuses?: PostStatus[];
  channelIds?: string[];
  campaignIds?: string[];
  search?: string;
}

/**
 * View Mode
 * Determines how posts are displayed
 */
export type ViewMode = 'list' | 'calendar';

/**
 * Direction for RTL support
 */
export type Direction = 'ltr' | 'rtl';

