import React, { useState, useEffect } from 'react';

interface CovidData {
  
  timeline: { date: string }[];
  cases: number[];
  
}

async function FetchData<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }
    const data = await response.json();
    return data as T; // Type assertion for data of type T
  } catch (error) {
    console.error('Error fetching data:', error);
    return null; 
  }
}

export default FetchData;
