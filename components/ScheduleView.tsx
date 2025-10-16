/**
 * ScheduleView Component
 *
 * Main component that orchestrates the schedule display.
 * This component should compose smaller components together.
 *
 * TODO for candidates:
 * 1. Create the component structure (header, controls, calendar)
 * 2. Compose DoctorSelector, DayView, WeekView together
 * 3. Handle view switching (day vs week)
 * 4. Manage state or use the useAppointments hook
 * 5. Think about component composition and reusability
 */

'use client';

import type { CalendarView } from '@/types';
import { DayView } from './DayView';
import { WeekView } from './WeekView';
import { getWeekStart } from '@/utils/dateUtils'; // Assuming this utility exists
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// TODO: Import your components
import { DoctorSelector } from './DoctorSelector';
import { MOCK_APPOINTMENTS, MOCK_DOCTORS } from '@/data/mockData';

interface ScheduleViewProps {
  selectedDoctorId: string;
  selectedDate: Date;
  view: CalendarView;
  onDoctorChange: (doctorId: string) => void;
  onDateChange: (date: Date) => void;
  onViewChange: (view: CalendarView) => void;
}

/**
 * ScheduleView Component
 *
 * This is the main container component for the schedule interface.
 *
 * TODO: Implement this component
 *
 * Consider:
 * - How to structure the layout (header, controls, calendar)
 * - How to compose smaller components
 * - How to pass data down to child components
 * - How to handle user interactions (view switching, date changes)
 */
export function ScheduleView({
  selectedDoctorId,
  selectedDate,
  view,
  onDoctorChange,
  onDateChange,
  onViewChange,
}: ScheduleViewProps) {
  // Dynamically fetch the selected doctor based on `selectedDoctorId`
  const doctor = MOCK_DOCTORS.find((doc) => doc.id === selectedDoctorId);

  return (
    <div className="bg-white rounded-lg shadow-lg">
      {/* Header with doctor info and controls */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Doctor Schedule</h2>
            {doctor && (
              <p className="text-sm text-gray-600 mt-1">
               {doctor.name} - {doctor.specialty}
              </p>
            )}
          </div>

          <div className="flex gap-4">
            <DoctorSelector
              doctors={MOCK_DOCTORS}
              selectedDoctorId={selectedDoctorId}
              onDoctorChange={onDoctorChange}
            />

            <div className="text-sm text-gray-500">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => date && onDateChange(date)}
                className="border rounded px-2 py-1"
              />
            </div>

            <div className="flex gap-2">
              <button
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded"
                onClick={() => onViewChange('day')}
              >
                Day
              </button>
              <button
                className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded"
                onClick={() => onViewChange('week')}
              >
                Week
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar View */}
      <div className="p-6">
        {view === 'day' ? (
          <DayView
            appointments={appointments}
            doctor={doctor}
            date={selectedDate}
          />
        ) : (
          <WeekView
            appointments={appointments}
            doctor={doctor}
            weekStartDate={getWeekStart(selectedDate)}
          />
        )}
      </div>
    </div>
  );
}

// Use mock data for appointments and doctor
const appointments = MOCK_APPOINTMENTS;
const doctor = MOCK_DOCTORS[0];
