import { Schema, model, Document } from 'mongoose';

// Interface for Triangle document
export interface ITriangle extends Document {
  sideA: number;
  sideB: number;
  sideC: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Schema definition for Triangle
const triangleSchema = new Schema<ITriangle>(
  {
    sideA: {
      type: Number,
      required: [true, 'Side A measurement is required'],
      min: [0, 'Side A must be a positive number']
    },
    sideB: {
      type: Number,
      required: [true, 'Side B measurement is required'],
      min: [0, 'Side B must be a positive number']
    },
    sideC: {
      type: Number,
      required: [true, 'Side C measurement is required'],
      min: [0, 'Side C must be a positive number']
    }
  },
  {
    timestamps: true,
    collection: 'triangle' // Specify the collection name
  }
);

// Virtual property for calculating area using Heron's formula
triangleSchema.virtual('area').get(function() {
  // Calculate semi-perimeter
  const s = (this.sideA + this.sideB + this.sideC) / 2;
  // Calculate area using Heron's formula
  return Math.sqrt(s * (s - this.sideA) * (s - this.sideB) * (s - this.sideC));
});

// Virtual property for checking if the triangle is valid
triangleSchema.virtual('isValid').get(function() {
  // Triangle inequality theorem: sum of the lengths of any two sides must be greater than the length of the remaining side
  return (
    this.sideA + this.sideB > this.sideC &&
    this.sideA + this.sideC > this.sideB &&
    this.sideB + this.sideC > this.sideA
  );
});

// Model creation
const Triangle = model<ITriangle>('Triangle', triangleSchema);

export default Triangle;
