import p5 from 'p5';
import { Note } from '../types/portfolioTypes';

export const ANIMATION_CONSTANTS = {
  NOTE_COUNT: 12,
  FADE_SPEED: 0.5,
  MIN_SIZE: 10,
  MAX_SIZE: 20,
  MIN_SPEED: 0.5,
  MAX_SPEED: 1.5,
  MIN_OPACITY: 50,
  MAX_OPACITY: 200,
  BORDER_GLOW_COLOR: [255, 240, 100, 50] as [number, number, number, number],
  BORDER_PADDING: 10,
  BORDER_RADIUS: 8,
};

/**
 * Create a new note at a random edge of the canvas
 */
export const createNote = (p: p5, canvasWidth: number, canvasHeight: number): Note => {
  const side = Math.floor(p.random(4)); // 0: top, 1: right, 2: bottom, 3: left
  let x, y;
  
  // Position notes along the border
  switch (side) {
    case 0: // top
      x = p.random(canvasWidth);
      y = 0;
      break;
    case 1: // right
      x = canvasWidth;
      y = p.random(canvasHeight);
      break;
    case 2: // bottom
      x = p.random(canvasWidth);
      y = canvasHeight;
      break;
    case 3: // left
      x = 0;
      y = p.random(canvasHeight);
      break;
    default:
      x = p.random(canvasWidth);
      y = p.random(canvasHeight);
  }
  
  return {
    x,
    y,
    size: p.random(ANIMATION_CONSTANTS.MIN_SIZE, ANIMATION_CONSTANTS.MAX_SIZE),
    angle: p.random(p.TWO_PI),
    speed: p.random(ANIMATION_CONSTANTS.MIN_SPEED, ANIMATION_CONSTANTS.MAX_SPEED),
    opacity: p.random(ANIMATION_CONSTANTS.MIN_OPACITY, ANIMATION_CONSTANTS.MAX_OPACITY),
    isQuarterNote: p.random() > 0.5,
  };
};

/**
 * Draw a quarter note
 */
export const drawQuarterNote = (p: p5, note: Note) => {
  p.fill(0, 0, 0, note.opacity);
  p.ellipse(0, 0, note.size, note.size * 0.8);
  p.line(note.size / 2, 0, note.size / 2, -note.size * 1.8);
};

/**
 * Draw an eighth note
 */
export const drawEighthNote = (p: p5, note: Note) => {
  p.fill(0, 0, 0, note.opacity);
  p.ellipse(0, 0, note.size, note.size * 0.8);
  p.line(note.size / 2, 0, note.size / 2, -note.size * 1.8);
  p.beginShape();
  p.vertex(note.size / 2, -note.size * 1.8);
  p.bezierVertex(
    note.size * 1.2, -note.size * 1.8,
    note.size * 1.2, -note.size * 1.2,
    note.size / 2, -note.size * 1.2
  );
  p.endShape();
};

/**
 * Check if a note is out of bounds or faded out
 */
export const isNoteOutOfBounds = (note: Note, canvasWidth: number, canvasHeight: number): boolean => {
  return note.opacity <= 0 || 
    note.x < -note.size * 2 || 
    note.x > canvasWidth + note.size * 2 || 
    note.y < -note.size * 2 || 
    note.y > canvasHeight + note.size * 2;
}; 