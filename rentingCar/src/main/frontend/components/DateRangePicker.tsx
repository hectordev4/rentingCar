import { DatePicker, HorizontalLayout } from '@vaadin/react-components';
import { useDateContext } from 'Frontend/contexts/DateContext';

export default function DateRangePicker() {
  const { startDate, endDate, setStartDate, setEndDate } = useDateContext();

  return (
    <HorizontalLayout theme="spacing">
      <DatePicker
        value={startDate || ''}
        label="Departure date"
        max={endDate || undefined}
        onValueChanged={(event) => {
          setStartDate(event.detail.value || null);
        }}
      />
      <DatePicker
        value={endDate || ''}
        label="Return date"
        min={startDate || undefined}
        onValueChanged={(event) => {
          setEndDate(event.detail.value || null);
        }}
      />
    </HorizontalLayout>
  );
}
