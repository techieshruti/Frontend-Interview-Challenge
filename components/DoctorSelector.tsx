/**
 * DoctorSelector Component
 *
 * Dropdown to select which doctor's schedule to view.
 * For front desk staff (can see all doctors).
 *
 * TODO for candidates:
 * 1. Fetch list of all doctors
 * 2. Display in a dropdown/select
 * 3. Show doctor name and specialty
 * 4. Handle selection change
 * 5. Consider using a custom dropdown or native select
 */

'use client';

import { useState, useEffect } from 'react';
import type { Doctor } from '@/types';
import {MOCK_DOCTORS} from '@/data/mockData'

interface DoctorSelectorProps {
  doctors: Doctor[]; // Added this line to include the doctors prop
  selectedDoctorId: string;
  onDoctorChange: (doctorId: string) => void;
}

/**
 * DoctorSelector Component
 *
 * A dropdown to select a doctor from the list of available doctors.
 *
 * TODO: Implement this component
 *
 * Consider:
 * - Should you fetch doctors here or accept them as props?
 * - Native <select> or custom dropdown component?
 * - How to display doctor info (name + specialty)?
 * - Should this be a reusable component?
 */
export function DoctorSelector({
  doctors,
  selectedDoctorId,
  onDoctorChange,
}: DoctorSelectorProps) {
  const [fetchedDoctors, setFetchedDoctors] = useState<Doctor[]>([]); // Renamed state variable

  // TODO: Fetch doctors
  useEffect(() => {
    setFetchedDoctors(doctors); // Updated to use the renamed state variable
  }, [doctors]);

  // Find currently selected doctor for display
  const selectedDoctor = fetchedDoctors.find((d) => d.id === selectedDoctorId); // Updated to use the renamed state variable

  return (
    <div className="doctor-selector">
      <label htmlFor="doctor-select" className="block mb-2 text-sm font-medium text-gray-700">
        Select Doctor
      </label>

      {/* Option 1: Native select */}
      <select
      id='doctos-select'
        value={selectedDoctorId}
        onChange={(e) => onDoctorChange(e.target.value)}
        className="block w-full px-4 py-2 pr-8 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select a doctor...</option>
        {/* TODO: Map over doctors and create options */}
        {fetchedDoctors.map((doctor) => (
          <option key={doctor.id} value={doctor.id}>
            {/* TODO: Format display text (e.g., "Dr. Sarah Chen - Cardiology") */}
            Dr. {doctor.name} - {doctor.specialty}
          </option>
        ))}
      </select>

      {/* Option 2: Custom dropdown (BONUS)
      <button
        type="button"
        className="w-full px-4 py-2 text-sm text-left border rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedDoctor
          ? `Dr. ${selectedDoctor.name} - ${selectedDoctor.specialty}`
          : 'Select a doctor...'}
      </button>

      {isOpen && (
        <div className="absolute mt-1 w-full bg-white border rounded-lg shadow-lg">
          {fetchedDoctors.map((doctor) => (
            <button
              key={doctor.id}
              className="w-full px-4 py-2 text-left hover:bg-gray-100"
              onClick={() => {
                onDoctorChange(doctor.id);
                setIsOpen(false);
              }}
            >
              Dr. {doctor.name} - {doctor.specialty}
            </button>
          ))}
        </div>
      )}
      */}
    </div>
  );
}
