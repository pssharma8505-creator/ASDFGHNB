import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ZoomIn, X, ChevronLeft, ChevronRight, Camera, FolderOpen, Grid, ArrowRight } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  image: string;
}

interface Album {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  items: GalleryItem[];
}

const ALBUMS: Album[] = [
  {
    id: "panel-assembly",
    title: "Control Panel Assembly",
    description: "Witness our meticulous step-by-step assembly of PLC cabinets, MCC switchgears, and customised drive panels on our core facility floor.",
    coverImage: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458365/WhatsApp_Image_2026-06-14_at_10.14.46_PM_zm3q8i.jpg",
    items: [
      {
        id: "img-2",
        title: "Assembly Photo #2",
        image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458365/WhatsApp_Image_2026-06-14_at_10.14.46_PM_zm3q8i.jpg"
      },
      {
        id: "img-3",
        title: "Assembly Photo #3",
        image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458365/WhatsApp_Image_2026-06-14_at_10.14.47_PM_1_wbzmzk.jpg"
      },
      {
        id: "img-12",
        title: "Assembly Photo #12",
        image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458347/WhatsApp_Image_2026-06-14_at_10.14.37_PM_jawjia.jpg"
      },
      {
        id: "img-13",
        title: "Assembly Photo #13",
        image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458347/WhatsApp_Image_2026-06-14_at_10.14.30_PM_f2juoo.jpg"
      },
      {
        id: "img-14",
        title: "Assembly Photo #14",
        image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458346/WhatsApp_Image_2026-06-14_at_10.14.38_PM_teqvvz.jpg"
      },
      {
        id: "img-15",
        title: "Assembly Photo #15",
        image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458345/WhatsApp_Image_2026-06-14_at_10.14.41_PM_uylptk.jpg"
      },
      {
        id: "img-16",
        title: "Assembly Photo #16",
        image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458342/WhatsApp_Image_2026-06-14_at_10.14.43_PM_iraqzp.jpg"
      },
      {
        id: "img-17",
        title: "Assembly Photo #17",
        image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458341/WhatsApp_Image_2026-06-14_at_10.14.44_PM_knmv4y.jpg"
      },
      {
        id: "img-18",
        title: "Assembly Photo #18",
        image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458340/WhatsApp_Image_2026-06-14_at_10.14.46_PM_1_g0wpcq.jpg"
      },
      {
        id: "img-19",
        title: "Assembly Photo #19",
        image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458339/WhatsApp_Image_2026-06-14_at_10.14.46_PM_2_thdekr.jpg"
      },
      {
        id: "img-20",
        title: "Assembly Photo #20",
        image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458338/WhatsApp_Image_2026-06-14_at_10.14.47_PM_swjk9u.jpg"
      },
      {
        id: "img-21",
        title: "Assembly Photo #21",
        image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458338/WhatsApp_Image_2026-06-14_at_10.14.48_PM_1_tcoyta.jpg"
      }
    ]
  },
  {
    id: "testing-qa",
    title: "Testing & Quality Assurance",
    description: "Every module undergoes multiple stages of power load tests, thermal logging, and software diagnostics to meet standard IEC benchmarks.",
    coverImage: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458366/WhatsApp_Image_2026-06-14_at_10.14.40_PM_nf5tny.jpg",
    items: [
      {
        id: "img-1",
        title: "Testing Photo #1",
        image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458366/WhatsApp_Image_2026-06-14_at_10.14.40_PM_nf5tny.jpg"
      },
      {
        id: "img-5",
        title: "Testing Photo #5",
        image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458361/WhatsApp_Image_2026-06-14_at_10.14.50_PM_2_rlakkb.jpg"
      },
      {
        id: "img-6",
        title: "Testing Photo #6",
        image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458360/WhatsApp_Image_2026-06-14_at_10.16.12_PM_c0ckhp.jpg"
      },
      {
        id: "img-7",
        title: "Testing Photo #7",
        image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458360/WhatsApp_Image_2026-06-14_at_10.16.17_PM_vmfh7r.jpg"
      },
      {
        id: "img-8",
        title: "Testing Photo #8",
        image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458359/WhatsApp_Image_2026-06-14_at_10.16.29_PM_msjcho.jpg"
      },
      {
        id: "img-9",
        title: "Testing Photo #9",
        image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458359/WhatsApp_Image_2026-06-14_at_10.16.23_PM_dpks0l.jpg"
      },
      {
        id: "img-10",
        title: "Testing Photo #10",
        image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458357/WhatsApp_Image_2026-06-14_at_10.17.19_PM_1_f7vqan.jpg"
      },
      {
        id: "img-11",
        title: "Testing Photo #11",
        image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458357/WhatsApp_Image_2026-06-14_at_10.17.22_PM_mhou8m.jpg"
      },
      {
        id: "img-26",
        title: "Testing Photo #26",
        image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458334/WhatsApp_Image_2026-06-14_at_10.15.47_PM_vdw95g.jpg"
      },
      {
        id: "img-27",
        title: "Testing Photo #27",
        image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458333/WhatsApp_Image_2026-06-14_at_10.14.50_PM_1_vqsgyh.jpg"
      },
      {
        id: "img-28",
        title: "Testing Photo #28",
        image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458332/WhatsApp_Image_2026-06-14_at_10.15.51_PM_s0bugz.jpg"
      },
      {
        id: "img-29",
        title: "Testing Photo #29",
        image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458331/WhatsApp_Image_2026-06-14_at_10.16.07_PM_pqpwtz.jpg"
      },
      {
        id: "img-30",
        title: "Testing Photo #30",
        image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458330/WhatsApp_Image_2026-06-14_at_10.16.16_PM_eymopo.jpg"
      },
      {
        id: "img-31",
        title: "Testing Photo #31",
        image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458330/WhatsApp_Image_2026-06-14_at_10.16.15_PM_ajcwhi.jpg"
      },
      {
        id: "img-32",
        title: "Testing Photo #32",
        image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458330/WhatsApp_Image_2026-06-14_at_10.16.13_PM_rkfv1w.jpg"
      },
      {
        id: "img-33",
        title: "Testing Photo #33",
        image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458328/WhatsApp_Image_2026-06-14_at_10.16.19_PM_mkhdlf.jpg"
      },
      {
        id: "img-34",
        title: "Testing Photo #34",
        image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458327/WhatsApp_Image_2026-06-14_at_10.16.24_PM_ypjmqu.jpg"
      },
      {
        id: "img-35",
        title: "Testing Photo #35",
        image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458327/WhatsApp_Image_2026-06-14_at_10.16.20_PM_wzkmt8.jpg"
      },
      {
        id: "img-36",
        title: "Testing Photo #36",
        image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458326/WhatsApp_Image_2026-06-14_at_10.16.21_PM_iudogz.jpg"
      },
      {
        id: "img-37",
        title: "Testing Photo #37",
        image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458325/WhatsApp_Image_2026-06-14_at_10.16.27_PM_tsigia.jpg"
      },
      {
        id: "img-38",
        title: "Testing Photo #38",
        image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458324/WhatsApp_Image_2026-06-14_at_10.16.32_PM_dtit1s.jpg"
      },
      {
        id: "img-39",
        title: "Testing Photo #39",
        image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458324/WhatsApp_Image_2026-06-14_at_10.17.19_PM_zljv9n.jpg"
      },
      {
        id: "img-40",
        title: "Testing Photo #40",
        image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458323/WhatsApp_Image_2026-06-14_at_10.16.30_PM_zgchxj.jpg"
      },
      {
        id: "img-41",
        title: "Testing Photo #41",
        image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458323/WhatsApp_Image_2026-06-14_at_10.17.20_PM_1_vvz2f9.jpg"
      },
      {
        id: "img-42",
        title: "Testing Photo #42",
        image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458321/WhatsApp_Image_2026-06-14_at_10.17.18_PM_ip7w0q.jpg"
      },
      {
        id: "img-43",
        title: "Testing Photo #43",
        image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458321/WhatsApp_Image_2026-06-14_at_10.17.24_PM_dhsjtc.jpg"
      },
      {
        id: "img-44",
        title: "Testing Photo #44",
        image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458320/WhatsApp_Image_2026-06-14_at_10.17.20_PM_yde4ks.jpg"
      },
      {
        id: "img-45",
        title: "Testing Photo #45",
        image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458319/WhatsApp_Image_2026-06-14_at_10.17.22_PM_1_exwppk.jpg"
      },
      {
        id: "img-46",
        title: "Testing Photo #46",
        image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458319/WhatsApp_Image_2026-06-14_at_10.17.19_PM_2_zuno0b.jpg"
      },
      {
        id: "img-47",
        title: "Testing Photo #47",
        image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458318/WhatsApp_Image_2026-06-14_at_10.17.24_PM_1_zvjoca.jpg"
      },
      {
        id: "img-48",
        title: "Testing Photo #48",
        image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458295/WhatsApp_Image_2026-06-14_at_10.17.25_PM_r7tzpl.jpg"
      }
    ]
  },
  {
    id: "warehouse-spares",
    title: "Warehouse & Components Store",
    description: "Our authentic raw component storage, stocking certified PLC components, VFD modules, and copper busbars for emergency breakdowns.",
    coverImage: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458363/WhatsApp_Image_2026-06-14_at_10.14.49_PM_arkogo.jpg",
    items: [
      {
        id: "img-4",
        title: "Warehouse Photo #4",
        image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458363/WhatsApp_Image_2026-06-14_at_10.14.49_PM_arkogo.jpg"
      },
      {
        id: "img-22",
        title: "Warehouse Photo #22",
        image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458337/WhatsApp_Image_2026-06-14_at_10.14.48_PM_ncuah4.jpg"
      },
      {
        id: "img-23",
        title: "Warehouse Photo #23",
        image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458336/WhatsApp_Image_2026-06-14_at_10.14.48_PM_2_cqigg2.jpg"
      },
      {
        id: "img-24",
        title: "Warehouse Photo #24",
        image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458336/WhatsApp_Image_2026-06-14_at_10.14.50_PM_fcs8ra.jpg"
      },
      {
        id: "img-25",
        title: "Warehouse Photo #25",
        image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458335/WhatsApp_Image_2026-06-14_at_10.14.49_PM_1_b4ij4f.jpg"
      }
    ]
  }
];

// All images flattened for easily browsing the complete gallery
const ALL_PHOTOS: (GalleryItem & { albumTitle: string })[] = [
  {
    id: "img-2",
    title: "Assembly Photo #2",
    image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458365/WhatsApp_Image_2026-06-14_at_10.14.46_PM_zm3q8i.jpg",
    albumTitle: "Control Panel Assembly"
  },
  {
    id: "img-3",
    title: "Assembly Photo #3",
    image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458365/WhatsApp_Image_2026-06-14_at_10.14.47_PM_1_wbzmzk.jpg",
    albumTitle: "Control Panel Assembly"
  },
  {
    id: "img-12",
    title: "Assembly Photo #12",
    image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458347/WhatsApp_Image_2026-06-14_at_10.14.37_PM_jawjia.jpg",
    albumTitle: "Control Panel Assembly"
  },
  {
    id: "img-13",
    title: "Assembly Photo #13",
    image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458347/WhatsApp_Image_2026-06-14_at_10.14.30_PM_f2juoo.jpg",
    albumTitle: "Control Panel Assembly"
  },
  {
    id: "img-14",
    title: "Assembly Photo #14",
    image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458346/WhatsApp_Image_2026-06-14_at_10.14.38_PM_teqvvz.jpg",
    albumTitle: "Control Panel Assembly"
  },
  {
    id: "img-15",
    title: "Assembly Photo #15",
    image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458345/WhatsApp_Image_2026-06-14_at_10.14.41_PM_uylptk.jpg",
    albumTitle: "Control Panel Assembly"
  },
  {
    id: "img-16",
    title: "Assembly Photo #16",
    image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458342/WhatsApp_Image_2026-06-14_at_10.14.43_PM_iraqzp.jpg",
    albumTitle: "Control Panel Assembly"
  },
  {
    id: "img-17",
    title: "Assembly Photo #17",
    image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458341/WhatsApp_Image_2026-06-14_at_10.14.44_PM_knmv4y.jpg",
    albumTitle: "Control Panel Assembly"
  },
  {
    id: "img-18",
    title: "Assembly Photo #18",
    image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458340/WhatsApp_Image_2026-06-14_at_10.14.46_PM_1_g0wpcq.jpg",
    albumTitle: "Control Panel Assembly"
  },
  {
    id: "img-19",
    title: "Assembly Photo #19",
    image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458339/WhatsApp_Image_2026-06-14_at_10.14.46_PM_2_thdekr.jpg",
    albumTitle: "Control Panel Assembly"
  },
  {
    id: "img-20",
    title: "Assembly Photo #20",
    image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458338/WhatsApp_Image_2026-06-14_at_10.14.47_PM_swjk9u.jpg",
    albumTitle: "Control Panel Assembly"
  },
  {
    id: "img-21",
    title: "Assembly Photo #21",
    image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458338/WhatsApp_Image_2026-06-14_at_10.14.48_PM_1_tcoyta.jpg",
    albumTitle: "Control Panel Assembly"
  },
  {
    id: "img-1",
    title: "Testing Photo #1",
    image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458366/WhatsApp_Image_2026-06-14_at_10.14.40_PM_nf5tny.jpg",
    albumTitle: "Testing & Quality Assurance"
  },
  {
    id: "img-5",
    title: "Testing Photo #5",
    image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458361/WhatsApp_Image_2026-06-14_at_10.14.50_PM_2_rlakkb.jpg",
    albumTitle: "Testing & Quality Assurance"
  },
  {
    id: "img-6",
    title: "Testing Photo #6",
    image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458360/WhatsApp_Image_2026-06-14_at_10.16.12_PM_c0ckhp.jpg",
    albumTitle: "Testing & Quality Assurance"
  },
  {
    id: "img-7",
    title: "Testing Photo #7",
    image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458360/WhatsApp_Image_2026-06-14_at_10.16.17_PM_vmfh7r.jpg",
    albumTitle: "Testing & Quality Assurance"
  },
  {
    id: "img-8",
    title: "Testing Photo #8",
    image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458359/WhatsApp_Image_2026-06-14_at_10.16.29_PM_msjcho.jpg",
    albumTitle: "Testing & Quality Assurance"
  },
  {
    id: "img-9",
    title: "Testing Photo #9",
    image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458359/WhatsApp_Image_2026-06-14_at_10.16.23_PM_dpks0l.jpg",
    albumTitle: "Testing & Quality Assurance"
  },
  {
    id: "img-10",
    title: "Testing Photo #10",
    image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458357/WhatsApp_Image_2026-06-14_at_10.17.19_PM_1_f7vqan.jpg",
    albumTitle: "Testing & Quality Assurance"
  },
  {
    id: "img-11",
    title: "Testing Photo #11",
    image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458357/WhatsApp_Image_2026-06-14_at_10.17.22_PM_mhou8m.jpg",
    albumTitle: "Testing & Quality Assurance"
  },
  {
    id: "img-26",
    title: "Testing Photo #26",
    image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458334/WhatsApp_Image_2026-06-14_at_10.15.47_PM_vdw95g.jpg",
    albumTitle: "Testing & Quality Assurance"
  },
  {
    id: "img-27",
    title: "Testing Photo #27",
    image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458333/WhatsApp_Image_2026-06-14_at_10.14.50_PM_1_vqsgyh.jpg",
    albumTitle: "Testing & Quality Assurance"
  },
  {
    id: "img-28",
    title: "Testing Photo #28",
    image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458332/WhatsApp_Image_2026-06-14_at_10.15.51_PM_s0bugz.jpg",
    albumTitle: "Testing & Quality Assurance"
  },
  {
    id: "img-29",
    title: "Testing Photo #29",
    image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458331/WhatsApp_Image_2026-06-14_at_10.16.07_PM_pqpwtz.jpg",
    albumTitle: "Testing & Quality Assurance"
  },
  {
    id: "img-30",
    title: "Testing Photo #30",
    image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458330/WhatsApp_Image_2026-06-14_at_10.16.16_PM_eymopo.jpg",
    albumTitle: "Testing & Quality Assurance"
  },
  {
    id: "img-31",
    title: "Testing Photo #31",
    image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458330/WhatsApp_Image_2026-06-14_at_10.16.15_PM_ajcwhi.jpg",
    albumTitle: "Testing & Quality Assurance"
  },
  {
    id: "img-32",
    title: "Testing Photo #32",
    image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458330/WhatsApp_Image_2026-06-14_at_10.16.13_PM_rkfv1w.jpg",
    albumTitle: "Testing & Quality Assurance"
  },
  {
    id: "img-33",
    title: "Testing Photo #33",
    image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458328/WhatsApp_Image_2026-06-14_at_10.16.19_PM_mkhdlf.jpg",
    albumTitle: "Testing & Quality Assurance"
  },
  {
    id: "img-34",
    title: "Testing Photo #34",
    image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458327/WhatsApp_Image_2026-06-14_at_10.16.24_PM_ypjmqu.jpg",
    albumTitle: "Testing & Quality Assurance"
  },
  {
    id: "img-35",
    title: "Testing Photo #35",
    image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458327/WhatsApp_Image_2026-06-14_at_10.16.20_PM_wzkmt8.jpg",
    albumTitle: "Testing & Quality Assurance"
  },
  {
    id: "img-36",
    title: "Testing Photo #36",
    image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458326/WhatsApp_Image_2026-06-14_at_10.16.21_PM_iudogz.jpg",
    albumTitle: "Testing & Quality Assurance"
  },
  {
    id: "img-37",
    title: "Testing Photo #37",
    image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458325/WhatsApp_Image_2026-06-14_at_10.16.27_PM_tsigia.jpg",
    albumTitle: "Testing & Quality Assurance"
  },
  {
    id: "img-38",
    title: "Testing Photo #38",
    image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458324/WhatsApp_Image_2026-06-14_at_10.16.32_PM_dtit1s.jpg",
    albumTitle: "Testing & Quality Assurance"
  },
  {
    id: "img-39",
    title: "Testing Photo #39",
    image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458324/WhatsApp_Image_2026-06-14_at_10.17.19_PM_zljv9n.jpg",
    albumTitle: "Testing & Quality Assurance"
  },
  {
    id: "img-40",
    title: "Testing Photo #40",
    image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458323/WhatsApp_Image_2026-06-14_at_10.16.30_PM_zgchxj.jpg",
    albumTitle: "Testing & Quality Assurance"
  },
  {
    id: "img-41",
    title: "Testing Photo #41",
    image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458323/WhatsApp_Image_2026-06-14_at_10.17.20_PM_1_vvz2f9.jpg",
    albumTitle: "Testing & Quality Assurance"
  },
  {
    id: "img-42",
    title: "Testing Photo #42",
    image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458321/WhatsApp_Image_2026-06-14_at_10.17.18_PM_ip7w0q.jpg",
    albumTitle: "Testing & Quality Assurance"
  },
  {
    id: "img-43",
    title: "Testing Photo #43",
    image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458321/WhatsApp_Image_2026-06-14_at_10.17.24_PM_dhsjtc.jpg",
    albumTitle: "Testing & Quality Assurance"
  },
  {
    id: "img-44",
    title: "Testing Photo #44",
    image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458320/WhatsApp_Image_2026-06-14_at_10.17.20_PM_yde4ks.jpg",
    albumTitle: "Testing & Quality Assurance"
  },
  {
    id: "img-45",
    title: "Testing Photo #45",
    image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458319/WhatsApp_Image_2026-06-14_at_10.17.22_PM_1_exwppk.jpg",
    albumTitle: "Testing & Quality Assurance"
  },
  {
    id: "img-46",
    title: "Testing Photo #46",
    image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458319/WhatsApp_Image_2026-06-14_at_10.17.19_PM_2_zuno0b.jpg",
    albumTitle: "Testing & Quality Assurance"
  },
  {
    id: "img-47",
    title: "Testing Photo #47",
    image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458318/WhatsApp_Image_2026-06-14_at_10.17.24_PM_1_zvjoca.jpg",
    albumTitle: "Testing & Quality Assurance"
  },
  {
    id: "img-48",
    title: "Testing Photo #48",
    image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458295/WhatsApp_Image_2026-06-14_at_10.17.25_PM_r7tzpl.jpg",
    albumTitle: "Testing & Quality Assurance"
  },
  {
    id: "img-4",
    title: "Warehouse Photo #4",
    image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458363/WhatsApp_Image_2026-06-14_at_10.14.49_PM_arkogo.jpg",
    albumTitle: "Warehouse & Components Store"
  },
  {
    id: "img-22",
    title: "Warehouse Photo #22",
    image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458337/WhatsApp_Image_2026-06-14_at_10.14.48_PM_ncuah4.jpg",
    albumTitle: "Warehouse & Components Store"
  },
  {
    id: "img-23",
    title: "Warehouse Photo #23",
    image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458336/WhatsApp_Image_2026-06-14_at_10.14.48_PM_2_cqigg2.jpg",
    albumTitle: "Warehouse & Components Store"
  },
  {
    id: "img-24",
    title: "Warehouse Photo #24",
    image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458336/WhatsApp_Image_2026-06-14_at_10.14.50_PM_fcs8ra.jpg",
    albumTitle: "Warehouse & Components Store"
  },
  {
    id: "img-25",
    title: "Warehouse Photo #25",
    image: "https://res.cloudinary.com/doetkvre5/image/upload/v1781458335/WhatsApp_Image_2026-06-14_at_10.14.49_PM_1_b4ij4f.jpg",
    albumTitle: "Warehouse & Components Store"
  }
];

interface GalleryPageProps {
  onBackToHome: () => void;
  darkMode: boolean;
}

export default function GalleryPage({ onBackToHome, darkMode }: GalleryPageProps) {
  const [viewMode, setViewMode] = useState<"all" | "albums">("all");
  const [activeAlbumId, setActiveAlbumId] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Set page scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [activeAlbumId, viewMode]);

  const activeAlbum = ALBUMS.find(a => a.id === activeAlbumId);

  // Determine current active item list based on selection and mode
  const currentPhotos = viewMode === "all"
    ? ALL_PHOTOS
    : (activeAlbum ? activeAlbum.items : []);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % currentPhotos.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + currentPhotos.length) % currentPhotos.length);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 transition-colors duration-500 pt-28 pb-24 w-full">
      <div className="container-wide">
        
        {/* Simple Minimal Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-emerald-500 hover:text-emerald-600 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back To Home</span>
            </button>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-light text-slate-900 dark:text-white tracking-tight leading-none">
              Engineering <span className="font-semibold text-emerald-500 dark:text-emerald-400">Workspace Gallery</span>
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl font-light leading-relaxed">
              Explore authentic high-resolution records of our manufacturing infrastructure, advanced equipment, diagnostic testing labs, and assembly lines.
            </p>
          </div>

          <div className="flex items-center space-x-3 text-slate-400 dark:text-slate-500 bg-white dark:bg-zinc-900/60 p-3 rounded-2xl border border-slate-200/50 dark:border-zinc-800/40">
            <Camera className="w-5 h-5 text-emerald-500" />
            <span className="text-xs uppercase tracking-widest font-bold text-slate-700 dark:text-slate-300">
              {ALL_PHOTOS.length} Certified Photos
            </span>
          </div>
        </div>

        {/* Navigation & Display Toggle Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/60 dark:border-zinc-900/80 mb-10">
          
          {/* View Toggles */}
          <div className="flex items-center space-x-2 bg-slate-100 dark:bg-zinc-900 p-1 rounded-xl w-fit">
            <button
              onClick={() => {
                setViewMode("albums");
                setActiveAlbumId(null);
              }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-medium uppercase tracking-wider transition-all cursor-pointer ${
                viewMode === "albums" && !activeAlbumId
                  ? "bg-white dark:bg-zinc-850 text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <FolderOpen className="w-3.5 h-3.5" />
              <span>Albums ({ALBUMS.length})</span>
            </button>
            <button
              onClick={() => {
                setViewMode("all");
                setActiveAlbumId(null);
              }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-medium uppercase tracking-wider transition-all cursor-pointer ${
                viewMode === "all"
                  ? "bg-white dark:bg-zinc-850 text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>All Stream ({ALL_PHOTOS.length})</span>
            </button>
          </div>

          {/* Diagnostic status */}
          <p className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
            UPDATED: JUNE 14, 2026 // REAL-TIME GALLERY VERIFIED
          </p>
        </div>

        {/* Dynamic Album Interior Header / Breadcrumbs */}
        {viewMode === "albums" && activeAlbumId && activeAlbum && (
          <div className="mb-8 flex items-center justify-between bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-100/60 dark:border-emerald-900/20 p-4 rounded-2xl">
            <div className="flex items-center space-x-3 text-sm">
              <button
                onClick={() => setActiveAlbumId(null)}
                className="text-slate-500 hover:text-slate-900 dark:hover:text-white font-medium transition-colors cursor-pointer"
              >
                Albums
              </button>
              <span className="text-slate-300 dark:text-zinc-750">/</span>
              <span className="font-semibold text-slate-900 dark:text-white">{activeAlbum.title}</span>
            </div>
            
            <button
              onClick={() => setActiveAlbumId(null)}
              className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
            >
              ← Back to All Albums
            </button>
          </div>
        )}

        {/* VIEW 1: ALBUMS OVERVIEW LISTING */}
        {viewMode === "albums" && !activeAlbumId && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ALBUMS.map((album) => (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                key={album.id}
                onClick={() => setActiveAlbumId(album.id)}
                className="group relative bg-white dark:bg-zinc-900/30 rounded-3xl border border-slate-205/60 dark:border-zinc-900 overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-300 dark:hover:border-zinc-800 transition-all duration-350 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Styled multi-photo stacked effect on top */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-zinc-950 p-3 pb-0">
                    
                    {/* Fake Stacked Background Cards */}
                    <div className="absolute top-2 left-6 right-6 bottom-4 bg-slate-200 dark:bg-zinc-800 rounded-2xl transform rotate-1 translate-y-2 opacity-50 group-hover:rotate-2 group-hover:translate-y-1 transition-transform" />
                    <div className="absolute top-1 left-4 right-4 bottom-4 bg-slate-300 dark:bg-zinc-750 rounded-2xl transform -rotate-1 translate-y-1 opacity-70 group-hover:-rotate-2 group-hover:translate-y-0 transition-transform" />
                    
                    {/* Top Main Cover */}
                    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-md">
                      <img
                        src={album.coverImage}
                        alt={album.title}
                        className="w-full h-full object-cover transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent opacity-80" />
                      
                      {/* Count Badge overlay */}
                      <span className="absolute bottom-3 right-3 bg-slate-900/90 dark:bg-zinc-950/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-xl">
                        {album.items.length} {album.items.length === 1 ? "Photo" : "Photos"}
                      </span>
                    </div>
                  </div>

                  {/* Album Body Text Info */}
                  <div className="p-6 pb-2 space-y-3">
                    <h3 className="text-lg font-display font-semibold text-slate-900 dark:text-white tracking-tight group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                      {album.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                      {album.description}
                    </p>
                  </div>
                </div>

                {/* Footer Action Trigger */}
                <div className="p-6 pt-2">
                  <span className="inline-flex items-center space-x-2 text-xs font-bold text-emerald-500 uppercase tracking-wider group-hover:translate-x-1.5 transition-transform duration-300">
                    <span>Explore Album</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* VIEW 2: ALBUM PHOTOS STREAM & ALL PHOTOS STREAM */}
        {((viewMode === "albums" && activeAlbumId) || viewMode === "all") && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {currentPhotos.map((photo, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={photo.id}
                  className="group bg-white dark:bg-zinc-900/40 rounded-2xl border border-slate-200/50 dark:border-zinc-900 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer"
                  onClick={() => setLightboxIndex(index)}
                  id={`gallery-card-${photo.id}`}
                >
                  {/* Photo Wrapper */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-zinc-950">
                    <img
                      src={photo.image}
                      alt={photo.title}
                      className="w-full h-full object-cover transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Hover Zoom Indicator */}
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                        <ZoomIn className="w-4.5 h-4.5" />
                      </div>
                    </div>

                    {/* Show Album Name Tag on "All Stream" Mode */}
                    {"albumTitle" in photo && (
                      <span className="absolute bottom-3 left-3 bg-slate-900/80 dark:bg-zinc-950/80 backdrop-blur-md text-white text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded">
                        {photo.albumTitle}
                      </span>
                    )}
                  </div>

                  {/* Caption Bar */}
                  <div className="p-4 flex-1 flex flex-col justify-center min-h-[72px]">
                    <h4 className="font-sans font-medium text-xs text-slate-800 dark:text-slate-200 leading-relaxed group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                      {photo.title}
                    </h4>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

      </div>

      {/* Fullscreen Minimal Visual Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && currentPhotos[lightboxIndex] && (
          <div
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close Button top-right */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/80 text-white border border-white/10 transition-all cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Centered Image display block with left/right keys */}
            <div className="relative max-w-5xl w-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <motion.img
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                src={currentPhotos[lightboxIndex].image}
                alt={currentPhotos[lightboxIndex].title}
                className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl border border-white/10"
                referrerPolicy="no-referrer"
              />

              {/* Prev & Next controls */}
              <button
                onClick={handlePrev}
                className="absolute left-4 p-3 rounded-full bg-black/40 hover:bg-black/70 text-white border border-white/10 transition-all hover:scale-105 cursor-pointer"
                title="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 p-3 rounded-full bg-black/40 hover:bg-black/70 text-white border border-white/10 transition-all hover:scale-105 cursor-pointer"
                title="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Slide title & indicators below image */}
            <div className="mt-6 text-center max-w-xl space-y-2 pointer-events-none" onClick={(e) => e.stopPropagation()}>
              <span className="inline-block bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-widest text-emerald-400 uppercase">
                {("albumTitle" in currentPhotos[lightboxIndex]) 
                  ? (currentPhotos[lightboxIndex] as any).albumTitle 
                  : (activeAlbum ? activeAlbum.title : "Workspace Gallery")}
              </span>
              <p className="text-sm font-sans text-stone-200 px-4">
                {currentPhotos[lightboxIndex].title}
              </p>
              <p className="text-[10px] text-stone-500">
                Photo {lightboxIndex + 1} of {currentPhotos.length}
              </p>
            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
