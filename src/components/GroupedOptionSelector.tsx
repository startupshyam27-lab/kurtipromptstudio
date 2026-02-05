import React, { useState, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface GroupData {
  label: string;
  labelHi: string;
  options: readonly string[];
}

interface GroupedOptionSelectorProps {
  title: string;
  titleHi: string;
  icon: React.ReactNode;
  groups: Record<string, GroupData>;
  selected: string[];
  onSelect: (values: string[]) => void;
  translations: Record<string, string>;
  showHindi: boolean;
  defaultOpenGroups?: string[];
  searchQuery?: string;
}

export const GroupedOptionSelector: React.FC<GroupedOptionSelectorProps> = ({
  title,
  titleHi,
  icon,
  groups,
  selected,
  onSelect,
  translations,
  showHindi,
  defaultOpenGroups = [],
  searchQuery = '',
}) => {
  const [isMainOpen, setIsMainOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState<string[]>(defaultOpenGroups);

  // Filter groups and options based on search
  const filteredGroups = useMemo(() => {
    if (!searchQuery) return groups;
    const query = searchQuery.toLowerCase();
    const result: Record<string, GroupData> = {};
    
    Object.entries(groups).forEach(([key, group]) => {
      const filteredOptions = group.options.filter(option => {
        const hindiLabel = translations[option] || '';
        return option.toLowerCase().includes(query) || hindiLabel.includes(query);
      });
      
      if (filteredOptions.length > 0) {
        result[key] = { ...group, options: filteredOptions };
      }
    });
    
    return result;
  }, [groups, searchQuery, translations]);

  const hasMatches = Object.keys(filteredGroups).length > 0;
  const shouldBeOpen = searchQuery && hasMatches ? true : isMainOpen;

  const toggleGroup = (groupKey: string) => {
    setOpenGroups(prev =>
      prev.includes(groupKey)
        ? prev.filter(k => k !== groupKey)
        : [...prev, groupKey]
    );
  };

  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onSelect(selected.filter(s => s !== option));
    } else {
      onSelect([...selected, option]);
    }
  };

  const getOptionLabel = (option: string) => {
    if (showHindi && translations[option]) {
      return `${option} / ${translations[option]}`;
    }
    return option;
  };

  const getGroupLabel = (group: GroupData) => {
    if (showHindi || searchQuery) {
      return `${group.label} / ${group.labelHi}`;
    }
    return group.label;
  };

  const getSelectedCountInGroup = (options: readonly string[]) => {
    return options.filter(o => selected.includes(o)).length;
  };

  const totalOptions = Object.values(groups).reduce((acc, g) => acc + g.options.length, 0);
  const filteredTotal = Object.values(filteredGroups).reduce((acc, g) => acc + g.options.length, 0);
  const clearAll = () => onSelect([]);

  // Hide if no matches
  if (searchQuery && !hasMatches) return null;

  return (
    <Collapsible open={shouldBeOpen} onOpenChange={setIsMainOpen} className="border rounded-lg bg-card">
      <CollapsibleTrigger asChild>
        <button className="flex items-center justify-between w-full p-3 hover:bg-muted/50 transition-colors rounded-lg">
          <div className="flex items-center gap-2">
            {icon}
            <span className="font-medium text-sm">
              {(showHindi || searchQuery) ? `${title} / ${titleHi}` : title}
            </span>
            <span className="text-xs text-muted-foreground">
              ({searchQuery ? `${filteredTotal}/${totalOptions}` : totalOptions})
            </span>
            {selected.length > 0 && (
              <Badge variant="secondary" className="text-xs">
                {selected.length} selected
              </Badge>
            )}
          </div>
          <ChevronDown className={cn("w-4 h-4 transition-transform", shouldBeOpen && "rotate-180")} />
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="px-3 pb-3 space-y-2">
          {selected.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearAll} className="text-xs h-6">
              Clear all
            </Button>
          )}
          
          {/* Sub-groups */}
          <div className="space-y-1.5">
            {Object.entries(filteredGroups).map(([groupKey, group]) => {
              const isOpen = searchQuery ? true : openGroups.includes(groupKey);
              const selectedInGroup = getSelectedCountInGroup(group.options);

              return (
                <Collapsible key={groupKey} open={isOpen} onOpenChange={() => toggleGroup(groupKey)}>
                  <CollapsibleTrigger asChild>
                    <button className="flex items-center justify-between w-full px-3 py-2 bg-muted/50 hover:bg-muted rounded-lg transition-colors">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{getGroupLabel(group)}</span>
                        <span className="text-xs text-muted-foreground">({group.options.length})</span>
                        {selectedInGroup > 0 && (
                          <Badge variant="default" className="text-xs h-5">
                            {selectedInGroup}
                          </Badge>
                        )}
                      </div>
                      <ChevronDown className={cn("w-3 h-3 transition-transform", isOpen && "rotate-180")} />
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="flex flex-wrap gap-1.5 p-2 bg-background/50 rounded-b-lg border border-t-0">
                      {group.options.map((option) => {
                        const isSelected = selected.includes(option);
                        return (
                          <Badge
                            key={option}
                            variant={isSelected ? "default" : "outline"}
                            className={cn(
                              "cursor-pointer transition-all text-xs py-1.5 px-2.5 hover:scale-105",
                              isSelected
                                ? "bg-primary hover:bg-primary/90"
                                : "hover:bg-primary/10 hover:border-primary"
                            )}
                            onClick={() => toggleOption(option)}
                          >
                            {getOptionLabel(option)}
                          </Badge>
                        );
                      })}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              );
            })}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
