import { LuLaptop, LuWifi, LuRadio, LuBot, LuActivity, LuPalette } from "react-icons/lu";
import { FaPlugCircleBolt, FaScrewdriverWrench, FaPlaneUp, FaPencil, FaBrain, FaEarthAmericas } from "react-icons/fa6";
import { HiScale, HiOutlineUsers } from "react-icons/hi2";

export const fieldsList = [
  { id: "it", label: "IT та програмування", icon: LuLaptop },
  { id: "telecom", label: "Телекомунікації та мережі", icon: LuWifi },
  { id: "electronics", label: "Електроніка та радіотехніка", icon: LuRadio },
  { id: "robotics", label: "Автоматизація та робототехніка", icon: LuBot },
  { id: "energy", label: "Енергетика", icon: FaPlugCircleBolt },
  { id: "bio", label: "Біотехнології/медицина", icon: LuActivity },
  { id: "business", label: "Бізнес та менеджмент", icon: HiOutlineUsers },
  { id: "security", label: "Безпека інформації", icon: HiScale },
  { id: "design", label: "Дизайн та медіа", icon: LuPalette },
  { id: "mechanics", label: "Інженерія та механіка", icon: FaScrewdriverWrench },
  { id: "aerospace", label: "Авіація та космос", icon: FaPlaneUp },
  { id: "chemistry", label: "Хімія та екологія", icon: FaEarthAmericas },
  { id: "humanities", label: "Право, соціологія та мови", icon: FaBrain },
  { id: "science", label: "Математика та фізика", icon: FaPencil }
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