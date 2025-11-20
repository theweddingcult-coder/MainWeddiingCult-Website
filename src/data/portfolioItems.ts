import {
  normalizeDriveImageUrl,
  extractDriveFileId,
  buildDriveImageUrl,
  type DriveImageVariant,
} from "@/lib/googleDrive";

export type FilterType =
  | "All"
  | "Wedding"
  | "Haldi"
  | "Mehndi"
  | "Pre-Wedding"
  | "Shagan";

export interface PortfolioItem {
  id: number;
  image: string;
  category: FilterType;
}

const basePortfolioItems: PortfolioItem[] = [
  {
    id: 1,
    image: normalizeDriveImageUrl(
      "https://drive.google.com/file/d/1aAsz85weFkFE8qp1nkdF7oQjCyUP2QT9/view?usp=sharing",
      "cdn"
    ),
    category: "Wedding",
  },
];

const DRIVE_COLLECTIONS: Array<{ category: FilterType; urls: string[] }> = [
  {
    category: "Haldi",
    urls: [
      "https://drive.google.com/file/d/1c8_46kX8HzZkdmx-NydIcDyTHBLLsQUD/view?usp=sharing",
      "https://drive.google.com/file/d/1fcBCxJKzWpzPFoSszJfG_BgjiDvvKge3/view?usp=sharing",
      "https://drive.google.com/file/d/1Q5sr7-bvpKh-ygxffTb4k-xFJafIm1mT/view?usp=sharing",
      "https://drive.google.com/file/d/1o0rP7jur7awJEmaOvcG1EaKVYr0nRo6l/view?usp=sharing",
      "https://drive.google.com/file/d/1xLEH7M5eUkVOvyD1ix5cFJGgVrv1-ewM/view?usp=sharing",
      "https://drive.google.com/file/d/1Vk1SmJKALzrf7mHjKG1YBs5mqYYj0eP_/view?usp=sharing",
      "https://drive.google.com/file/d/1WZgfZk-3bofH_BGi26Cn9JX0PIvE22QZ/view?usp=sharing",
      "https://drive.google.com/file/d/1ibZ8FLLewypPHbpCBhzVU44h1YI88Bwq/view?usp=sharing",
      "https://drive.google.com/file/d/1iXFYz_IZyVeiub6NNtRgAJSCdl8hojvh/view?usp=sharing",
      "https://drive.google.com/file/d/1pm5SImQclkIR2e3YHbJcaGcafeGXTSI7/view?usp=sharing",
      "https://drive.google.com/file/d/1mRvMA5fhdHNzn5fjJKEVnqlUorwwWJ28/view?usp=sharing",
      "https://drive.google.com/file/d/105U-CckTRwCsel_EjY4H2DNdF_B-pRmI/view?usp=sharing",
      "https://drive.google.com/file/d/1SGOOeiT8NjuG54ZgU-gqe2_KOo4wcDGo/view?usp=sharing",
      "https://drive.google.com/file/d/1YcTBsliBRzC4K_V33GPs6SytmZVTetDZ/view?usp=sharing",
      "https://drive.google.com/file/d/1qhPJPS_hhJL7JF8PyCu-3_WbteykzqCm/view?usp=sharing",
      "https://drive.google.com/file/d/142KxrWvoPevn4UnFx_NmkKnWOWKWYBWA/view?usp=sharing",
    ],
  },
  {
    category: "Mehndi",
    urls: [
      "https://drive.google.com/file/d/1IaatKLtLLGwgHvraLF_zj2cHsZrRFvdP/view?usp=sharing",
      "https://drive.google.com/file/d/1IaatKLtLLGwgHvraLF_zj2cHsZrRFvdP/view?usp=sharing",
      "https://drive.google.com/file/d/1XvpJtUHtOcozFQlTpxH5NrE45xJFCyPj/view?usp=sharing",
      "https://drive.google.com/file/d/1YP5IRBfKE8q-aqo37YP2ECQOkR-LcWAu/view?usp=sharing",
      "https://drive.google.com/file/d/18sGqohu2huaRYK12iPYDztp0MgabGI44/view?usp=sharing",
      "https://drive.google.com/file/d/1wiM3HEYvdk5RFWMRtU4flSGIfBzy2vFy/view?usp=sharing",
      "https://drive.google.com/file/d/1waVwye3C_42TMnsu700ZhxN046s0rJDc/view?usp=sharing",
      "https://drive.google.com/file/d/1qDlW5aTWMcrYnfV1JM-T7WJY0sAyQOgU/view?usp=sharing",
      "https://drive.google.com/file/d/1TU9DSu2zYCtdK08qBTt7C-jagAW5b-fM/view?usp=sharing",
      "https://drive.google.com/file/d/1bCHLKJ1Tn1W7Fzk1a3yZ3_UgKiXSKQoj/view?usp=sharing",
      "https://drive.google.com/file/d/1-4Vlc75oLjNsVXQHj61z-5LCuw7dO-dX/view?usp=sharing",
      "https://drive.google.com/file/d/1T9hItLddMDdP3aUap6OY1JB3Kl__RG16/view?usp=sharing",
      "https://drive.google.com/file/d/1t5Y625L8Xfcogz8fPHSUZErTULtxjIKI/view?usp=sharing",
      "https://drive.google.com/file/d/1uPFO_80XwaWZk1W0RPjQEkPBNFL3jPAm/view?usp=sharing",
      "https://drive.google.com/file/d/1YJW2efA9gBDAYKaGeB5uGPlPJQCLWHSf/view?usp=sharing",
      "https://drive.google.com/file/d/1ktF3JVKip4Q65487rjnNwjbP2vep8iFX/view?usp=sharing",
      "https://drive.google.com/file/d/1ktF3JVKip4Q65487rjnNwjbP2vep8iFX/view?usp=sharing",
      "https://drive.google.com/file/d/1goMgGAPBv2zySmj9_nkuiHzJoV0OunoQ/view?usp=sharing",
    ],
  },
  {
    category: "Pre-Wedding",
    urls: [
      "https://drive.google.com/file/d/1ktuNbOYp8QMzN2B36_-5hfVyyQSE53wz/view?usp=sharing",
      "https://drive.google.com/file/d/1K-9jraP5wgYh1_edzKAHPdW4dOHMyLXM/view?usp=sharing",
      "https://drive.google.com/file/d/12uVK3LuEclSE_C586EkTpsokvPwHJpNa/view?usp=sharing",
      "https://drive.google.com/file/d/1IPgNPwTCx1aA1mBWQeKMRS0N3R7zDyMY/view?usp=sharing",
      "https://drive.google.com/file/d/10gsqd1kDEV1zL3YTB47fnIMKm5tEzxye/view?usp=sharing",
      "https://drive.google.com/file/d/11xo2kUICoeMPeOQHSmv5fjTMb_8Nsr6J/view?usp=sharing",
      "https://drive.google.com/file/d/1dWiiLC4ax5OeD7heeRA-2t-1tDeNanbb/view?usp=sharing",
      "https://drive.google.com/file/d/1MsfqPV2OQGUxYxoVvtqKyiZGFjlF-ktX/view?usp=sharing",
      "https://drive.google.com/file/d/1IxF9c76gg596PSyd4d5S-i1gby5uyZ7L/view?usp=sharing",
      "https://drive.google.com/file/d/1pjlWFP51WtLkWy7vAdu3FcaRroofj0Do/view?usp=sharing",
      "https://drive.google.com/file/d/1WTvqPgrgOaC2t6XgMsSyM9Sg2Rnp9mq5/view?usp=sharing",
      "https://drive.google.com/file/d/19gZLfiyQJQl671Vd8IWEoUbYjBQkCxe1/view?usp=sharing",
      "https://drive.google.com/file/d/1RHazSFe27WeOlvbbBrRoiQHrNwoG6M_v/view?usp=sharing",
      "https://drive.google.com/file/d/1ZDwbELqmHmsDD4o52PHxJ-BeZcLEYR2_/view?usp=sharing",
      "https://drive.google.com/file/d/15fONXicWA6AKjrtjhz0lLx10omrfK4Oh/view?usp=sharing",
      "https://drive.google.com/file/d/1bvxkJY1wqv4HfdiKfwdLLL95pEvEy17C/view?usp=sharing",
      "https://drive.google.com/file/d/1BgnpQIR2OkGHM5hcoJ51ljppKCheTUup/view?usp=sharing",
      "https://drive.google.com/file/d/1zJglsxHXDPPi-PTNuuTDcp4SK29kREB2/view?usp=sharing",
      "https://drive.google.com/file/d/1oN2qBmgAkfb75vIFUFD6fXOb61BU6-wa/view?usp=sharing",
      "https://drive.google.com/file/d/1DGFnfRJzk0fjz8Y7rYbFgITgfkbSw1Ea/view?usp=sharing",
      "https://drive.google.com/file/d/1JFeCaOT71s92R6m7O_QSOlCSS2QCtkt3/view?usp=sharing",
      "https://drive.google.com/file/d/1tTfSqt_f8J4PHkDFB_zVB65hu-hwmrQ5/view?usp=sharing",
    ],
  },
  {
    category: "Wedding",
    urls: [
      "https://drive.google.com/file/d/1TXy0O-il7y33NhG5pkgU31OJBZg-hvvL/view?usp=sharing",
      "https://drive.google.com/file/d/19ut8gsJQOMx_qTnaJRH_vVrxcLUgE_PR/view?usp=sharing",
      "https://drive.google.com/file/d/19ut8gsJQOMx_qTnaJRH_vVrxcLUgE_PR/view?usp=sharing",
      "https://drive.google.com/file/d/1aj4UTlhu-SVImeHZ2U3N-5Ffoi85o7XU/view?usp=sharing",
      "https://drive.google.com/file/d/1Sah7ZJOcttE0AuY4aUk2afcMsl80tvDZ/view?usp=sharing",
      "https://drive.google.com/file/d/1Sah7ZJOcttE0AuY4aUk2afcMsl80tvDZ/view?usp=sharing",
      "https://drive.google.com/file/d/1bq5pQ3e1R4kIcJc-Dbiupe75OkrFY70j/view?usp=sharing",
      "https://drive.google.com/file/d/13JQkTi8MDfPdW_-sya-hxP1oNP-gcp2E/view?usp=sharing",
      "https://drive.google.com/file/d/1EzHk5Rey3uJpI20E1DUE2nzQBwoGv5in/view?usp=sharing",
      "https://drive.google.com/file/d/1mUzYZC-MQ3qX8AVc8qwTN0WjRRNDc6s3/view?usp=sharing",
    ],
  },
  {
    category: "Shagan",
    urls: [
      "https://drive.google.com/file/d/1T4djS6ZccgtDJRXNtFmqHKpk2yvQEcAB/view?usp=drive_link",
      "https://drive.google.com/file/d/1aVtsl5gWRO43bW-vMxBGauBfMH6BRns2/view?usp=drive_link",
      "https://drive.google.com/file/d/1ijBLXOKncCmLZNQw13MeiF-VxPlSE0LQ/view?usp=drive_link",
      "https://drive.google.com/file/d/1mui_GOYGhGF6sBziuwG2MNC4-D9H-TQI/view?usp=drive_link",
      "https://drive.google.com/file/d/1JfqNIi0Si6edUOQ8IuJMxPXJwttjJUs_/view?usp=drive_link",
      "https://drive.google.com/file/d/1Z-j3e87vgEm_GO6u2ZVPdI6CELIMEeYQ/view?usp=drive_link",
      "https://drive.google.com/file/d/1ymz_esax135WwNV3cjWSjPBOXYh9MB_v/view?usp=drive_link",
      "https://drive.google.com/file/d/1t2dA73veFRSoMq-10JuOsOZIHgl3N_rF/view?usp=drive_link",
      "https://drive.google.com/file/d/1dVmNc1ZKEBV5WidurODCVZmQYs_elqul/view?usp=drive_link",
    ],
  },
];

const createDrivePortfolioItems = (startingId: number): PortfolioItem[] => {
  let nextId = startingId;
  const items: PortfolioItem[] = [];

  DRIVE_COLLECTIONS.forEach(({ category, urls }) => {
    urls.forEach((url) => {
      const normalized = normalizeDriveImageUrl(url, "cdn");
      items.push({
        id: nextId++,
        image: normalized,
        category,
      });
    });
  });

  return items;
};

const shufflePortfolioItems = <T,>(list: T[]): T[] => {
  return [...list].sort(() => Math.random() - 0.5);
};

const highestExistingId = basePortfolioItems.reduce((max, item) => Math.max(max, item.id), 0);
const drivePortfolioItems = createDrivePortfolioItems(highestExistingId + 1);

export const portfolioItems = shufflePortfolioItems([...basePortfolioItems, ...drivePortfolioItems]);

export const pickPortfolioImageUrls = (
  count: number,
  variant: DriveImageVariant = "cdn"
) => {
  const seen = new Set<string>();
  const picked: string[] = [];

  for (const item of portfolioItems) {
    const driveId = extractDriveFileId(item.image);
    const url = driveId ? buildDriveImageUrl(driveId, variant) : item.image;

    if (!url || seen.has(url)) continue;
    seen.add(url);
    picked.push(url);

    if (picked.length >= count) break;
  }

  return picked;
};

