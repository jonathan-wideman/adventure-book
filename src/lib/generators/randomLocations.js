import { MersenneTwister19937, Random } from "random-js";

export const locationFeatures = [
  "Hideout",
  "Ruin",
  "Mine",
  "Waste",
  "Mystical Site",
  "Path",
  "Outpost",
  "Wall",
  "Battlefield",
  "Hovel",
  "Spring",
  "Lair",
  "Fort",
  "Bridge",
  "Camp",
  "Cairn",
  "Grave",
  "Caravan",
  "Caravan",
  "Waterfall",
  "Waterfall",
  "Cave",
  "Cave",
  "Swamp",
  "Swamp",
  "Fen",
  "Fen",
  "Ravine",
  "Ravine",
  "Road",
  "Road",
  "Tree",
  "Tree",
  "Pond",
  "Pond",
  "Fields",
  "Fields",
  "Marsh",
  "Marsh",
  "Steading",
  "Steading",
  "Rapids",
  "Rapids",
  "Pass",
  "Pass",
  "Trail",
  "Trail",
  "Glade",
  "Glade",
  "Plain",
  "Plain",
  "Ridge",
  "Ridge",
  "Cliff",
  "Cliff",
  "Grove",
  "Grove",
  "Village",
  "Village",
  "Moor",
  "Moor",
  "Thicket",
  "Thicket",
  "River Ford",
  "River Ford",
  "Valley",
  "Valley",
  "Bay",
  "Fjord",
  "Foothills",
  "Foothills",
  "Lake",
  "Lake",
  "River",
  "River",
  "River",
  "Forest",
  "Forest",
  "Forest",
  "Forest",
  "Coast",
  "Coast",
  "Coast",
  "Coast",
  "Hill",
  "Hill",
  "Hill",
  "Hill",
  "Hill",
  "Mountain",
  "Mountain",
  "Mountain",
  "Mountain",
  "Mountain",
  "Woods",
  "Woods",
  "Woods",
  "Woods",
  "Woods",
  "Woods",
  "Anomaly",
];

export const locationDescriptors = [
  "High",
  "Remote",
  "Exposed",
  "Small",
  "Broken",
  "Diverse",
  "Rough",
  "Dark",
  "Shadowy",
  "Contested",
  "Grim",
  "Wild",
  "Fertile",
  "Blocked",
  "Ancient",
  "Perilous",
  "Hidden",
  "Occupied",
  "Rich",
  "Big",
  "Savage",
  "Defended",
  "Withered",
  "Mystical",
  "Inaccessible",
  "Protected",
  "Abandoned",
  "Wide",
  "Foul",
  "Dead",
  "Ruined",
  "Barren",
  "Cold",
  "Blighted",
  "Low",
  "Beautiful",
  "Abundant",
  "Lush",
  "Flooded",
  "Empty",
  "Strange",
  "Corrupted",
  "Peaceful",
  "Forgotten",
  "Expansive",
  "Settled",
  "Dense",
  "Civilized",
  "Desolate",
  "Isolated",
];

const rng = new Random(MersenneTwister19937.autoSeed());

export const randomLocation = () => {
  let locs = [rng.pick(locationFeatures)];
  if (rng.bool(0.2)) {
    locs.push(rng.pick(locationFeatures));
  }

  let desc = [];
  if (rng.bool(0.3)) {
    desc.push(rng.pick(locationDescriptors));
    if (rng.bool(0.1)) {
      desc.push(rng.pick(locationDescriptors));
    }
  }

  return {
    locations: locs,
    descriptors: desc,
  };
};

export const randomFeatures = () => {
  let features = [rng.pick(locationFeatures)];
  if (rng.bool(0.2)) {
    features.push(rng.pick(locationFeatures));
  }
  return features;
};

export const randomDescriptors = () => {
  let descriptors = [];
  if (rng.bool(0.3)) {
    descriptors.push(rng.pick(locationDescriptors));
    if (rng.bool(0.1)) {
      descriptors.push(rng.pick(locationDescriptors));
    }
  }
  return descriptors;
};

export const randomFeaturesWithDescriptors = () => {
  return randomFeatures().map((feature) => ({
    feature,
    descriptors: randomDescriptors(),
  }));
};

export const formatFeaturesWithDescriptors = (features) => {
  return features
    .map((feature) =>
      [feature.descriptors.join(", "), feature.feature].join(" "),
    )
    .join("; ");
};
