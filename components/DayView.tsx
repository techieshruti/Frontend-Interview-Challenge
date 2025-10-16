/**
 * DayView Component
 *
 * Displays appointments for a single day in a timeline format.
 *
 * TODO for candidates:
 * 1. Generate time slots (8 AM - 6 PM, 30-minute intervals)
 * 2. Position appointments in their correct time slots
 * 3. Handle appointments that span multiple slots
 * 4. Display appointment details (patient, type, duration)
 * 5. Color-code appointments by type
 * 6. Handle overlapping appointments gracefully
 */

'use client';

import type { Appointment, Doctor, TimeSlot } from '@/types';

interface DayViewProps {
  appointments: Appointment[];
  doctor: Doctor | undefined;
  date: Date;
}

/**
 * DayView Component
 *
 * Renders a daily timeline view with appointments.
 *
 * TODO: Implement this component
 *
 * Architecture suggestions:
 * 1. Create a helper function to generate time slots
 * 2. Create a TimeSlotRow component for each time slot
 * 3. Create an AppointmentCard component for each appointment
 * 4. Calculate appointment positioning based on start/end times
 *
 * Consider:
 * - How to handle appointments that span multiple 30-min slots?
 * - How to show overlapping appointments?
 * - How to make the timeline scrollable if needed?
 * - How to highlight the current time?
 */
export function DayView({ appointments, doctor, date }: DayViewProps) {
  /**
   * TODO: Generate time slots
   *
   * Create an array of TimeSlot objects from 8 AM to 6 PM
   * with 30-minute intervals
   *
   * Hint: You can use a loop or date-fns utilities
   */
  function generateTimeSlots(): TimeSlot[] {
    const slots: TimeSlot[] = [];
    const startHour = 8;
    const endHour = 18;
    for (let hour = startHour; hour < endHour; hour++) {
      slots.push({
        start: new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, 0),
        end: new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, 30),
        label: `${hour}:00`, // Fixed the `${hour}` issue
      });
      slots.push({
        start: new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, 30),
        end: new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour + 1, 0),
        label: `${hour}:30`, // Fixed the `${hour}` issue
      });
    }
    return slots;
  }

  /**
   * TODO: Find appointments for a specific time slot
   *
   * Given a time slot, find all appointments that overlap with it
   */
  function getAppointmentsForSlot(slot: TimeSlot): Appointment[] {
    return appointments.filter(
      (apt) =>
        new Date(apt.startTime) < slot.end &&
        new Date(apt.endTime) > slot.start
    );
  }

  const timeSlots = generateTimeSlots();

  return (
    <div className="day-view">
      {/* Day header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {/* TODO: Format date nicely (e.g., "Monday, October 15, 2024") */}
          {date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </h3>
        {doctor && (
          <p className="text-sm text-gray-600">
            Dr. {doctor.name} - {doctor.specialty}
          </p>
        )}
      </div>

      {/* Timeline grid */}
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        {/* TODO: Implement the timeline */}
        <div className="divide-y divide-gray-200">
          {timeSlots.map((slot, index) => (
            <div key={index} className="flex">
              <div className="w-24 p-2 text-sm text-gray-600 border-r border-gray-300">
                {slot.label}
              </div>
              <div className="flex-1 p-2 min-h-[60px] relative">
                {getAppointmentsForSlot(slot).map((appointment) => (
                  <AppointmentCard key={appointment.id} appointment={appointment} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty state */}
      {appointments.length === 0 && (
        <div className="mt-4 text-center text-gray-500 text-sm">
          No appointments scheduled for this day
        </div>
      )}
    </div>
  );
}

/**
 * TODO: Create an AppointmentCard component
 *
 * This should be a small, reusable component that displays
 * a single appointment with appropriate styling.
 *
 * Consider:
 * - Show patient name
 * - Show appointment type
 * - Show duration
 * - Color-code by appointment type (use APPOINTMENT_TYPE_CONFIG from types)
 * - Make it visually clear when appointments span multiple slots
 */
export function AppointmentCard({ appointment }: { appointment: Appointment }) {
  const start = new Date(appointment.startTime);
  const end = new Date(appointment.endTime);
  const duration = Math.round((end.getTime() - start.getTime()) / (60 * 1000));

  const typeColors: Record<string, string> = {
    Consultation: 'bg-blue-100 text-blue-800 border-blue-300',
    Surgery: 'bg-red-100 text-red-800 border-red-300',
    Checkup: 'bg-green-100 text-green-800 border-green-300',
    Default: 'bg-gray-100 text-gray-800 border-gray-300',
  };

  const colorClass = typeColors[appointment.type] || typeColors.Default;

  return (
    <div
      className={`border-l-4 ${colorClass} rounded p-2 mb-1 shadow-sm text-xs`}
      style={{ minHeight: `${(duration / 30) * 30}px` }}
    >
      <div className="font-medium">{appointment.patientId}</div>
      <div>{appointment.type}</div>
      <div className="text-gray-600">
        {start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{' '}
        {end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
}
