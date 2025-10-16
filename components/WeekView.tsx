/**
 * WeekView Component
 *
 * Displays appointments for a week (Monday - Sunday) in a grid format.
 *
 * TODO for candidates:
 * 1. Generate a 7-day grid (Monday through Sunday)
 * 2. Generate time slots for each day
 * 3. Position appointments in the correct day and time
 * 4. Make it responsive (may need horizontal scroll on mobile)
 * 5. Color-code appointments by type
 * 6. Handle overlapping appointments
 */

'use client';

import type { Appointment, Doctor } from '@/types';
import {MOCK_PATIENTS} from '@/data/mockData'

interface WeekViewProps {
  appointments: Appointment[];
  doctor: Doctor | undefined;
  weekStartDate: Date; // Should be a Monday
}

/**
 * WeekView Component
 *
 * Renders a weekly calendar grid with appointments.
 *
 * TODO: Implement this component
 *
 * Architecture suggestions:
 * 1. Generate an array of 7 dates (Mon-Sun) from weekStartDate
 * 2. Generate time slots (same as DayView: 8 AM - 6 PM)
 * 3. Create a grid: rows = time slots, columns = days
 * 4. Position appointments in the correct cell (day + time)
 *
 * Consider:
 * - How to make the grid scrollable horizontally on mobile?
 * - How to show day names and dates in headers?
 * - How to handle appointments that span multiple hours?
 * - Should you reuse logic from DayView?
 */
export function WeekView({ appointments, doctor, weekStartDate }: WeekViewProps) {
  /**
   * TODO: Generate array of 7 dates (Monday through Sunday)
   */
  function getWeekDays(): Date[] {
    const days: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(weekStartDate);
    d.setDate(weekStartDate.getDate() + i);
    days.push(d);
  }
  return days;
  }

  /**
   * TODO: Generate time slots (same as DayView)
   */
  function generateTimeSlots() {
    const slots: { label: string; hour: number; minute: number }[] = [];
  for (let hour = 8; hour < 18; hour++) {
    slots.push({ label: `${hour}:00`, hour, minute: 0 });
    slots.push({ label: `${hour}:30`, hour, minute: 30 });
  }
  return slots;
  }

  /**
   * TODO: Get appointments for a specific day
   */
  function getAppointmentsForDay(date: Date): Appointment[] {
    // TODO: Filter appointments that fall on this specific day
    return appointments.filter((apt) => {
      const aptDate = new Date(apt.startTime);
      return(
        aptDate.getFullYear() === date.getFullYear() &&
        aptDate.getMonth() === date.getMonth() &&
        aptDate.getDate() === date.getDate()
      );
    });
  }

  /**
   * TODO: Get appointments for a specific day and time slot
   */
  function getAppointmentsForDayAndSlot(date: Date, slotStart: Date): Appointment[] {
    return appointments.filter(
    (apt) =>
      new Date(apt.startTime) < new Date(slotStart.getTime() + 30*60*1000) &&
      new Date(apt.endTime) > slotStart
  );
  }

  const weekDays = getWeekDays();
  const timeSlots = generateTimeSlots();

  return (
    <div className="week-view">
      {/* Week header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {/* TODO: Format week range (e.g., "Oct 14 - Oct 20, 2024") */}
          Week View
        </h3>
        {doctor && (
          <p className="text-sm text-gray-600">
            Dr. {doctor.name} - {doctor.specialty}
          </p>
        )}
      </div>

      {/* Week grid - may need horizontal scroll on mobile */}
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left">Time</th>
              {weekDays.map((day, index) => (
                <th key={index} className="border border-gray-300 p-2 text-left">
                  {day.toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((slot, slotIndex) => (
              <tr key={slotIndex}>
                <td className="border border-gray-300 p-2 text-sm text-gray-600">
                  {slot.label}
                </td>
                {weekDays.map((day, dayIndex) => {
                  // Create a Date object for the start of this slot on this day
                  const slotStart = new Date(day);
                  slotStart.setHours(slot.hour, slot.minute, 0, 0);
                  return (
                    <td key={dayIndex} className="border border-gray-300 p-2">
                      {getAppointmentsForDayAndSlot(day, slotStart).map((apt) => (
                        <div
                          key={apt.id}
                          className={`p-1 mb-1 rounded text-xs ${
                            apt.type === 'consultation'
                              ? 'bg-blue-100 text-blue-800'
                              : apt.type === 'procedure'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {MOCK_PATIENTS.find(p => p.id === apt.patientId)?.name ?? 'Unknown Patient'}
                        </div>
                      ))}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty state */}
      {appointments.length === 0 && (
        <div className="mt-4 text-center text-gray-500 text-sm">
          No appointments scheduled for this week
        </div>
      )}
    </div>
  );
}

/**
 * TODO: Consider reusing the AppointmentCard component from DayView
 *
 * You might want to add a "compact" prop to make it smaller for week view
 */
