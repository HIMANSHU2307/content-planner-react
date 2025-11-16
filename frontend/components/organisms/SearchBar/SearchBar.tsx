/**
 * SearchBar Organism Component
 * 
 * Provides search and filter functionality for posts.
 * Includes search input and filter dropdowns.
 */

import React from 'react';
import { PostStatus, Channel, Campaign } from '@/types';
import { Input } from '@/components/atoms/Input';
import { MultiSelect, MultiSelectOption } from '@/components/molecules/MultiSelect';
import styles from './SearchBar.module.scss';

export interface SearchBarProps {
  searchQuery: string;
  statusFilter: PostStatus[];
  channelFilter: string[];
  campaignFilter: string[];
  channels: Channel[];
  campaigns: Campaign[];
  onSearchChange: (query: string) => void;
  onStatusFilterChange: (statuses: PostStatus[]) => void;
  onChannelFilterChange: (channelIds: string[]) => void;
  onCampaignFilterChange: (campaignIds: string[]) => void;
  onClearFilters: () => void;
}

/**
 * SearchBar Component
 * 
 * Provides comprehensive filtering options for posts
 */
export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  statusFilter,
  channelFilter,
  campaignFilter,
  channels,
  campaigns,
  onSearchChange,
  onStatusFilterChange,
  onChannelFilterChange,
  onCampaignFilterChange,
  onClearFilters,
}) => {
  const statusOptions: MultiSelectOption[] = [
    { value: 'draft', label: 'Draft' },
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'published', label: 'Published' },
    { value: 'archived', label: 'Archived' },
  ];

  const channelOptions: MultiSelectOption[] = channels.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  const campaignOptions: MultiSelectOption[] = campaigns.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  const hasActiveFilters =
    Boolean(searchQuery.trim()) ||
    statusFilter.length > 0 ||
    channelFilter.length > 0 ||
    campaignFilter.length > 0;

  return (
    <div className={styles.searchBar}>
      <div className={styles.searchBar__row}>
        <div className={styles.searchBar__filters}>
          <div className={styles.searchBar__control}>
            <Input
              placeholder="Search posts…"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className={styles.searchBar__input}
            />
          </div>
          <MultiSelect
            placeholder="All statuses"
            options={statusOptions}
            selectedValues={statusFilter}
            onChange={(values) => onStatusFilterChange(values as PostStatus[])}
          />
          <MultiSelect
            placeholder="All channels"
            options={channelOptions}
            selectedValues={channelFilter}
            onChange={onChannelFilterChange}
          />
          <MultiSelect
            placeholder="All campaigns"
            options={campaignOptions}
            selectedValues={campaignFilter}
            onChange={onCampaignFilterChange}
          />
        </div>

        <div className={styles.searchBar__action}>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onClearFilters}
              className={styles.searchBar__clear}
              aria-label="Clear all filters"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

