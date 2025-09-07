import { Language } from './types';

export interface Example {
  title: string;
  prompt: string;
  language: Language;
}

export const EXAMPLES: Example[] = [
  {
    title: 'Simple Health Pickup',
    prompt: 'Create a device that restores 25 health to a player when they walk over it. The device should disable for 10 seconds after being used.',
    language: Language.VERSE,
  },
  {
    title: 'Basic Enemy AI',
    prompt: 'Write a script for a simple enemy character that patrols between two points. If a player gets within a 10-meter radius, the enemy should stop patrolling and face the player.',
    language: Language.VERSE,
  },
  {
    title: 'Round-Based Timer',
    prompt: 'Implement a timer that counts down from 60 seconds at the start of each round. When the timer reaches zero, send an event to end the round.',
    language: Language.UEFN_CPP,
  },
  {
    title: 'Player Score Manager',
    prompt: 'Create a C++ manager to track player scores. Include functions to award points to a player and retrieve the current score for a specific player.',
    language: Language.UEFN_CPP,
  },
  {
    title: 'Teleporter Device',
    prompt: 'Generate Verse code for a teleporter pad. When a player steps on it, they are instantly moved to a target location defined by another device.',
    language: Language.VERSE,
  },
  {
    title: 'Class Selector UI',
    prompt: 'Create a simple UI widget with buttons for players to select a class at the beginning of a match. When a button is clicked, apply the corresponding class to the player.',
    language: Language.VERSE,
  },
];
