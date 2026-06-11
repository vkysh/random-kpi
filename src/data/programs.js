import { LuLaptop, LuActivity, LuPalette } from "react-icons/lu";
import { FaScrewdriverWrench, FaBrain, FaEarthAmericas } from "react-icons/fa6";
import { HiScale, HiOutlineUsers } from "react-icons/hi2";

export const fieldsList = [
  { 
    code: "B", 
    label: "Культура, мистецтво та гуманітарні науки", 
    icon: LuPalette 
  },
  { 
    code: "C", 
    label: "Соціальні науки, журналістика та інформація", 
    icon: HiOutlineUsers 
  },
  { 
    code: "D", 
    label: "Бізнес, адміністрування та право", 
    icon: HiScale 
  },
  { 
    code: "E", 
    label: "Природничі науки, математика та статистика", 
    icon: FaEarthAmericas 
  },
  { 
    code: "F", 
    label: "Інформаційні технології", 
    icon: LuLaptop 
  },
  { 
    code: "G", 
    label: "Інженерія, виробництво та будівництво", 
    icon: FaScrewdriverWrench 
  },
  { 
    code: "I", 
    label: "Охорона здоров’я та соціальне забезпечення", 
    icon: LuActivity 
  }
];

export const groupedSoftTags = [
  {
    title: "Цифровий світ та IT",
    icon: LuLaptop,
    tags: [
      { id: "coding", label: "Писати код і створювати софт" },
      { id: "ai", label: "Штучний інтелект та Data Science" },
      { id: "cyber", label: "Цікавить кібербезпека" },
      { id: "networks", label: "Створювати мережі майбутнього" }
    ]
  },
  {
    title: "Залізо та Інженерія",
    icon: FaScrewdriverWrench,
    tags: [
      { id: "hardware", label: "Люблю колупатися в 'залізі'" },
      { id: "mechanics", label: "Люблю працювати руками / конструювати" },
      { id: "energy", label: "Енергетика та зелені технології" },
      { id: "aerospace", label: "Авіація, дрони та космос" }
    ]
  },
  {
    title: "Природа, Наука та Креатив",
    icon: LuActivity,
    tags: [
      { id: "math", label: "Обожнюю математику та складні задачі" },
      { id: "science", label: "Хімія та біологія — моє все" },
      { id: "creative", label: "Креатив, дизайн та медіа" },
      { id: "management", label: "Хочу керувати людьми / Власний стартап" }
    ]
  },
  {
    title: "Гуманітарій та Суспільство",
    icon: FaBrain,
    tags: [
      { id: "languages", label: "Вивчати іноземні мови та переклад" },
      { id: "society_law", label: "Право, соціологія та суспільство" },
      { id: "writing", label: "Писати тексти, журналістика" }
    ]
  }
];