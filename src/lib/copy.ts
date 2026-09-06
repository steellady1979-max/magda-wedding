export type Lang = "ka" | "fr";

export const WEDDING_DATE = "2026-11-18T16:00:00+04:00";

export const copy = {
  ka: {
    switchLabel: "ქარ",
    tap: "შეეხეთ გასახსნელად",
    weddingOf: "ქორწილი",
    bride: "ლუკასი",
    groom: "მარიამი",
    and: "&",
    date: "18 ნოემბერი 2026",
    venue: "Château de la Couronne,\nნუველ-აკიტენი, საფრანგეთი",
    countdownTitle: "უკუთვლა",
    countdown: {
      days: "დღე",
      hours: "საათი",
      minutes: "წუთი",
      seconds: "წამი",
    },
    greetingTitle: "მისალმება",
    greeting:
      "ძვირფასო სტუმრებო, ჩვენი დიდი ოჯახისთვის დიდი დღესასწაულია თქვენთან ერთად ამ მნიშვნელოვანი დღის აღნიშვნა. გელოდებით უდიდესი სიყვარულით.",
    scratchTitle: "გადაფხეკეთ ჩვენი ფოტოს გამოსაჩენად",
    scratchHint: "გადაიყოლეთ თითი ან კურსორი ვერცხლისფერ ზედაპირზე",
    scratchDone: "ლუკასი & მარიამი",
    dressTitle: "Dress Code",
    dressSubtitle: "ოფიციალური — Black-Tie",
    dressBody:
      "შატოში სანთლების შუქზე გასამართ საღამოს სულისკვეთებით, გთხოვთ, გამოცხადდეთ ყველაზე დახვეწილ საღამოს სამოსში. ბატონები — სმოკინგში ან მუქ ოფიციალურ კოსტიუმში; ქალბატონები — იატაკამდე საღამოს კაბებში ან ელეგანტურ კოქტეილის კაბებში.",
    dressBody2:
      "აირჩიეთ რბილი, რომანტიკული ტონები — შამპანურის, ბლაშის, მტვრიანი ცისფერი, სალბის, ქლიავისა და შუაღამის ფერები. გაითვალისწინეთ ბალახი და ხრეში — ფეხსაცმელი ისეთი შეარჩიეთ, რომლითაც გარიჟრაჟამდე იცეკვებთ. თეთრი და სპილოს ძვლის ფერი, გთხოვთ, პატარძლისთვის დაუტოვეთ.",
    stayTitle: "სად დარჩენა",
    hotelCta: "სასტუმროს ნახვა",
    hotels: [
      {
        name: "Domaine des Etangs, Auberge Resorts",
        meta: "20 წთ მანქანით · Massignac",
        url: "https://aubergeresorts.com/domainedesetangs/",
      },
      {
        name: "Chais Monnet Hôtel & Spa",
        meta: "45 წთ მანქანით · Cognac",
        url: "https://www.chaismonnethotel.com/",
      },
      {
        name: "Mercure Angoulême Hôtel de France",
        meta: "35 წთ მანქანით · Angoulême",
        url: "https://all.accor.com/hotel/1213/index.en.shtml",
      },
    ],
    mapTitle: "ადგილმდებარეობა",
    mapAddress: "Château de la Couronne,\n16250 Marthon, საფრანგეთი",
    mapCta: "რუკაზე ნახვა",
    footer: "გელოდებით უდიდესი სიყვარულით",
  },
  fr: {
    switchLabel: "FR",
    tap: "Touchez pour ouvrir",
    weddingOf: "Le mariage de",
    bride: "Lukas",
    groom: "Mariam",
    and: "&",
    date: "18 novembre 2026",
    venue: "Château de la Couronne,\nNouvelle-Aquitaine, France",
    countdownTitle: "Compte à rebours",
    countdown: {
      days: "Jours",
      hours: "Heures",
      minutes: "Minutes",
      seconds: "Secondes",
    },
    greetingTitle: "Bienvenue",
    greeting:
      "Chers invités, célébrer ce jour si important à vos côtés est une grande fête pour notre grande famille. Nous vous attendons avec le plus grand amour.",
    scratchTitle: "Grattez pour découvrir notre photo",
    scratchHint: "Glissez le doigt ou le curseur sur la surface argentée",
    scratchDone: "Lukas & Mariam",
    dressTitle: "Dress Code",
    dressSubtitle: "Tenue de soirée — Black-Tie",
    dressBody:
      "Dans l'esprit d'une soirée aux chandelles au château, nous vous invitons à porter votre plus belle tenue black-tie. Messieurs en smoking ou costume sombre ; mesdames en robe longue ou robe de cocktail élégante.",
    dressBody2:
      "Adoptez des tons doux et romantiques — champagne, blush, bleu poudré, sauge, prune et minuit — et choisissez des talons qui marchent sur l'herbe et le gravier et dansent jusqu'à l'aube. Merci de réserver l'ivoire et le blanc cassé à la mariée.",
    stayTitle: "Où séjourner",
    hotelCta: "Voir l'hôtel",
    hotels: [
      {
        name: "Domaine des Etangs, Auberge Resorts",
        meta: "20 min en voiture · Massignac",
        url: "https://aubergeresorts.com/domainedesetangs/",
      },
      {
        name: "Chais Monnet Hôtel & Spa",
        meta: "45 min en voiture · Cognac",
        url: "https://www.chaismonnethotel.com/",
      },
      {
        name: "Mercure Angoulême Hôtel de France",
        meta: "35 min en voiture · Angoulême",
        url: "https://all.accor.com/hotel/1213/index.en.shtml",
      },
    ],
    mapTitle: "Le lieu",
    mapAddress: "Château de la Couronne,\n16250 Marthon, France",
    mapCta: "Voir sur la carte",
    footer: "Nous vous attendons avec le plus grand amour",
  },
} as const;

export type Copy = (typeof copy)["ka"];
