export const tagDefinitions: Record<string, any> = {
  all: {
    children: ["person", "place"],
  },
  person: {
    plural: "people",
    parentTag: "all",
    children: ["comedian", "musician", "sports"],
  },
  place: {
    plural: "places",
    parentTag: "all",
    children: ["museum", "nature", "college", "city", "restaurant"],
  },
  profile: {
    plural: "profiles",
    parentTag: "all",
    children: [],
  },
  sports: {
    parentTag: "person",
  },
  comedian: { plural: "comedians", parentTag: "person" },
  musician: { plural: "musicians", parentTag: "person" },
  museum: { plural: "museums", parentTag: "place" },
  nature: { parentTag: "place" },
  college: { plural: "colleges", parentTag: "place" },
  city: { plural: "cities", parentTag: "place" },
  restaurant: { plural: "restaurants", parentTag: "place" },
} as const;
