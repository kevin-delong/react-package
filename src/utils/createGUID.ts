import { v4 as uuidv4 } from 'uuid';

export default function createGUID(): string {
  return uuidv4();
}
