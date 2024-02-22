import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getCountFromServer, serverTimestamp } from "firebase/firestore";

import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  addDoc,
} from "firebase/firestore";
import { Profile } from "./profile";
import { config } from "./config";
import { generateRandomDecimal } from "./formatting";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_API_KEY,
  authDomain: "fir-abc-a965d.firebaseapp.com",
  projectId: "fir-abc-a965d",
  storageBucket: "fir-abc-a965d.appspot.com",
  messagingSenderId: "360517790730",
  appId: "1:360517790730:web:0488ed0f086ee54e26c3f3",
};

export { type User, onAuthStateChanged } from "firebase/auth";

export type APIResponse<T = object> =
  | { success: true; data: T }
  | { success: false; error: string };

export const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(firebaseApp);

export const db = getFirestore(firebaseApp);

export async function fetchSomething() {
  await new Promise((r) => setTimeout(r, 0));
  return "something";
}

export async function fetchHubProfiles(
  hub: string,
  primaryTag: string,
  tags: Array<string> = [],
  profileLimit: number = config.maxNumberOfProfilesInRow
) {
  console.log("fetchHubProfiles", hub, primaryTag, tags);

  const normalizedTags =
    !tags || !tags.length ? config.defaultHubTags[primaryTag] : tags;

  const queryHub = ![config.rootHub, "index"].includes(hub)
    ? [where(`tagMap.${hub}`, "==", true)]
    : [];

  const queryTags = normalizedTags.map((tag) =>
    where(`tagMap.${tag}`, "==", true)
  );

  const args = [
    collection(db, "entity"),
    where("oinks", ">", 0),
    ...queryHub,
    where(`tagMap.${primaryTag}`, "==", true),
    ...queryTags,
    orderBy("oinks", "desc"),
    limit(profileLimit),
  ];

  const q = query.apply(null, args as any);
  const docs: Array<Profile> = [];

  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      docs.push({ ...(doc.data() as Profile), id: doc.id });
    });
  } catch (err) {
    console.log("err", err);
  }

  return {
    // tags: [],
    label: tags,
    profiles: docs,
  };
}

export async function fetchProfile(id: string | string[], uid?: string) {
  const profileId = Array.isArray(id) ? id[0] : id;
  console.log("fetch profile", id);
  if (!profileId) {
    throw new Error("profile id is required.");
  }

  const docRef = doc(db, "entity", profileId);
  const docSnap = await getDoc(docRef);
  const { tagMap, ...data } = docSnap.data() || {};

  const subColRef = collection(db, "entity", profileId, "whyawesome");

  const qSnap = await getDocs(subColRef);
  const reasons = qSnap.docs.map((d) => ({
    id: d.id,
    rating: generateRandomDecimal(1, 5),
    ratings: d.data().ratings || {
      "-1": generateRandomDecimal(1, 99),
      0: generateRandomDecimal(1, 99),
      1: generateRandomDecimal(1, 99),
      2: generateRandomDecimal(1, 99),
      3: generateRandomDecimal(1, 99),
    },
    ...d.data(),
  })) as Profile["reasons"];

  return {
    ...(data as Profile),
    tags: Object.keys(tagMap),
    id: docSnap.id,
    reasons: reasons.filter((item) => !item.userId),
    reasonsUser: reasons.filter((item) => !!item.userId),
  };
}
