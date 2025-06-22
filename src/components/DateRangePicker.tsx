
import React, { useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

interface DateRangePickerProps {
  onDateChange: (startDate: string, endDate: string) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ onDateChange }) => {
  const [date, setDate] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;

    let newDateRange: DateRange;

    if (!date.from || (date.from && date.to)) {
      // Start new selection
      newDateRange = { from: selectedDate, to: undefined };
    } else if (selectedDate < date.from) {
      // Selected date is before start date
      newDateRange = { from: selectedDate, to: date.from };
    } else {
      // Complete the range
      newDateRange = { from: date.from, to: selectedDate };
    }

    setDate(newDateRange);

    if (newDateRange.from && newDateRange.to) {
      onDateChange(
        format(newDateRange.from, 'yyyy-MM-dd'),
        format(newDateRange.to, 'yyyy-MM-dd')
      );
      setIsOpen(false);
    }
  };

  const clearDates = () => {
    setDate({ from: undefined, to: undefined });
    onDateChange('', '');
  };

  const formatDateRange = () => {
    if (date.from) {
      if (date.to) {
        return `${format(date.from, 'MMM dd')} - ${format(date.to, 'MMM dd')}`;
      }
      return `${format(date.from, 'MMM dd')} - Select end date`;
    }
    return 'Select dates';
  };

  return (
    <div className="flex gap-2">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'justify-start text-left font-normal',
              !date.from && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formatDateRange()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date.from}
            onSelect={handleDateSelect}
            disabled={(date) => date < new Date()}
            initialFocus
            className={cn("p-3 pointer-events-auto")}
          />
          {date.from && !date.to && (
            <div className="p-3 border-t text-sm text-muted-foreground text-center">
              Select end date
            </div>
          )}
        </PopoverContent>
      </Popover>

      {(date.from || date.to) && (
        <Button variant="ghost" size="sm" onClick={clearDates}>
          Clear
        </Button>
      )}
    </div>
  );
};

export default DateRangePicker;
