/**
 * Art and Technology — student course content (Thai-primary)
 * Source plans: arttechnoplan-th.md · resources-beginner-ai-th.md
 * Edit this file to update site content without touching every page.
 * Version: 2026-07-30 (site v1 revision)
 */
window.COURSE = {
  meta: {
    code: "3500230",
    title: "ศิลปะและเทคโนโลยี",
    titleEn: "Art and Technology",
    instructor: "ดร.ยศ วณีสอน",
    institution: "จุฬาลงกรณ์มหาวิทยาลัย · คณะศิลปกรรมศาสตร์",
    audience: "นักศึกษาชั้นปีที่ 1 สาขาการแสดงดนตรี (Western music)",
    semester: "ภาคต้น · 2569",
    schedule: "15 สัปดาห์ × 3 ชั่วโมง · วันจันทร์ · เริ่ม 3 สิงหาคม 2569",
    version: "2026-07-30",
    lastUpdated: "2026-07-30",
    currentWeek: 0,
    notice: "",
    dateStatus: "วันกำหนดเป็นเป้า — ยืนยันกับปฏิทินจุฬาฯ / วันหยุดอีกครั้ง",
    homeworkFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSeohZ7OkfM7k3yZaDuwKroTcZpKMvmCUw7jxMkMbgYfUgn6pA/viewform",
  },

  philosophy: [
    "ใช้ AI ระดับ free tier ในฐานะผู้ร่วมงาน (collaborator) — ไม่ใช่ผู้แทนวิจารณญาณทางดนตรี",
    "สาระทางดนตรีมาก่อน (musical substance first)",
    "เวิร์กโฟลว์หลายขั้น: วินิจฉัย → วางแผน → ลงมือ → วิพากษ์ → ปรับแก้",
    "vibe coding: สร้างเครื่องมือ HTML ไฟล์เดียวโดยไม่ต้องเขียนโค้ดเอง",
    "งานหนักในแล็บ · งานบ้าน AI ฟรี 10–15 นาทีบนโทรศัพท์",
  ],

  outcomes: [
    { id: "LO1", title: "ความรู้เท่าทัน AI สำหรับนักดนตรี", desc: "อธิบายได้ว่า AI ฟรีทำอะไรได้/ไม่ได้ และเลือกเครื่องมือให้เหมาะโจทย์" },
    { id: "LO2", title: "การออกแบบการฝึกซ้อม", desc: "วินิจฉัยปัญหาและแผนฝึกหลายสัปดาห์ร่วมกับ AI ปรับจากหลักฐานจริง" },
    { id: "LO3", title: "ค้นคว้าเรเพอร์ทัวร์และการเขียน", desc: "program notes / สรุปค้นคว้า พร้อมเปิดเผยการใช้ AI" },
    { id: "LO4", title: "ร่วมสร้างสรรค์อย่างมีวิจารณญาณ", desc: "ใช้ generative/assistive AI โดยมนุษย์เป็นผู้ตัดสินใจ" },
    { id: "LO5", title: "เครื่องมือเบราว์เซอร์แบบ vibe coding", desc: "สร้าง ทดสอบ ปรับ HTML ไฟล์เดียวสำหรับงานดนตรี" },
    { id: "LO6", title: "ออกแบบรายการแสดงและผู้ชม", desc: "แนวคิด mini recital / สื่อผู้ชมด้วยเครื่องมือฟรี" },
    { id: "LO7", title: "จริยธรรมและความซื่อสัตย์ทางวิชาการ", desc: "บันทึก disclosure หลีกเลี่ยงการคัดลอก ตระหนักลิขสิทธิ์" },
  ],

  assessment: [
    { name: "งานรายสัปดาห์และกระบวนการ", weight: "25%", when: "สัปดาห์ 1–14" },
    { name: "โครงงานกลางภาค", weight: "25%", when: "สัปดาห์ 8 (เป้า 21 ก.ย. 2569)" },
    { name: "โครงงานปลายภาค", weight: "35%", when: "สัปดาห์ 15 (เป้า 9 พ.ย. 2569)" },
    { name: "วินัยและความเป็นมืออาชีพ", weight: "15%", when: "ตลอดภาค" },
  ],

  semesterArc: [
    { id: "foundation", label: "Foundation", weeks: "1–6", desc: "บัญชี · วินิจฉัย · vibe coding · ค้นคว้า · วิพากษ์เสียง AI" },
    { id: "studio", label: "Practice Studio", weeks: "7–8", desc: "รวมชุดกลางภาค · นำเสนอ" },
    { id: "recital", label: "Recital / Creative Path", weeks: "9–14", desc: "รายการแสดง · เครื่องมือขั้นสูง · เลือกเส้นทาง · ผลิต" },
    { id: "showcase", label: "Final Showcase", weeks: "15", desc: "นำเสนอชุดปลายภาค" },
  ],

  tools: [
    {
      name: "Google AI Studio / Gemini",
      short: "Gemini",
      role: "LLM หลัก — วิเคราะห์ แผนฝึก program notes สร้าง HTML วิพากษ์",
      url: "https://aistudio.google.com/",
      status: "primary",
      category: "LLM",
      weeks: [1, 2, 3, 4, 7, 9, 10],
      fallback: "Claude (free tier)",
    },
    {
      name: "Claude (free tier)",
      short: "Claude",
      role: "LLM สำรอง — เอกสารยาว ปรับภาษา ดีบัก HTML",
      url: "https://claude.ai/",
      status: "primary",
      category: "LLM",
      weeks: [1, 2, 3, 10],
      fallback: "Gemini",
    },
    {
      name: "ChatGPT / GPT",
      short: "GPT",
      role: "LLM ทางเลือก — อธิบาย สรุป ระดมไอเดีย และสร้าง/แก้ HTML; ตรวจคำตอบเสมอ",
      url: "https://chatgpt.com/",
      status: "optional",
      category: "LLM",
      weeks: [1, 2, 3, 4, 5, 9, 10, 13],
      fallback: "Gemini / Claude",
    },
    {
      name: "Grok",
      short: "Grok",
      role: "LLM ทางเลือก — เปรียบเทียบคำตอบ ระดมไอเดีย และตั้งคำถามต่อ; ตรวจแหล่งเอง",
      url: "https://grok.com/",
      status: "optional",
      category: "LLM",
      weeks: [1, 5, 9],
      fallback: "Gemini / Claude",
    },
    {
      name: "NotebookLM",
      short: "NotebookLM",
      role: "ตอบจาก PDF/บันทึกที่อัปโหลด — ชุดค้นคว้า",
      url: "https://notebooklm.google.com/",
      status: "primary",
      category: "ค้นคว้า",
      weeks: [5],
      fallback: "สรุปจากแหล่งด้วย Gemini/Claude + ตรวจแหล่งเอง",
    },
    {
      name: "MuseScore",
      short: "MuseScore",
      role: "เขียนโน้ต ส่งออก เล่นฟังเบื้องต้น (ติดตั้งในแล็บ)",
      url: "https://musescore.org/",
      status: "primary",
      category: "โน้ต",
      weeks: [4, 11, 13],
      fallback: null,
    },
    {
      name: "Suno (free)",
      short: "Suno",
      role: "ร่างเสียงทดลอง / เดโมบรรยากาศ — ไม่ทดแทนโน้ต",
      url: "https://suno.com/",
      status: "primary",
      category: "สร้างเสียง",
      weeks: [6, 11],
      fallback: "ตรวจโควตาก่อนคาบ · ใช้เป็นร่าง/เดโมเท่านั้น",
    },
    {
      name: "IMSLP",
      short: "IMSLP",
      role: "โน้ตสาธารณสมบัติ",
      url: "https://imslp.org/",
      status: "primary",
      category: "ค้นคว้า",
      weeks: [5],
      fallback: null,
    },
    {
      name: "MuseScore.com",
      short: "MuseScore.com",
      role: "โน้ตแชร์ / ชุมชน",
      url: "https://musescore.com/",
      status: "primary",
      category: "โน้ต",
      weeks: [],
      fallback: null,
    },
    {
      name: "Google Drive / Docs",
      short: "Google Drive",
      role: "จัดเก็บ ร่างงาน ส่ง PDF",
      url: "https://drive.google.com/",
      status: "primary",
      category: "ไฟล์/งานเขียน",
      weeks: [1],
      fallback: null,
    },
    {
      name: "HTML tool (vibe coding)",
      short: "HTML tool",
      role: "เครื่องมือ HTML ไฟล์เดียวที่สร้างด้วย LLM — เมโทรนอม รายการตรวจ ฯลฯ",
      url: null,
      status: "primary",
      category: "HTML tool",
      weeks: [3, 7, 10, 13],
      fallback: "ใช้ LLM ที่สอง (Claude) ดีบักเมื่อพัง",
    },
    {
      name: "ACE Studio",
      short: "ACE Studio",
      role: "ทดลองเสียงร้อง/เครื่อง — ไม่เสถียรแบบฟรีระยะยาว ต้องมี Plan B",
      url: null,
      status: "uncertain",
      category: "สร้างเสียง",
      weeks: [6],
      fallback: "Suno (free) หรือข้ามส่วนสาธิต — ตรวจโควตาก่อนคาบ",
    },
    {
      name: "เครื่องมือสร้างภาพฟรี",
      short: "ภาพฟรี",
      role: "โปสเตอร์ / ภาพโซเชียล — ตรวจตัวอักษรเอง",
      url: null,
      status: "optional",
      category: "ไฟล์/งานเขียน",
      weeks: [9],
      fallback: null,
    },
    {
      name: "Audacity",
      short: "Audacity",
      role: "ตัดเสียงอัดจากโทรศัพท์ (ไม่บังคับ)",
      url: "https://www.audacityteam.org/",
      status: "optional",
      category: "สร้างเสียง",
      weeks: [],
      fallback: null,
    },
  ],

  disclosureFields: [
    "เครื่องมือที่ใช้ (ชื่อ + free tier)",
    "งานที่ AI ช่วย",
    "สิ่งที่ผู้เรียนตัดสินใจ/แก้ไขหลังได้ผลจาก AI",
    "prompt สำคัญ (เก็บหรือสรุป)",
    "คำรับรองว่าตรวจข้อกล่าวอ้างทางดนตรีในงานที่ส่งแล้ว",
  ],

  ethicsDo: [
    "ใช้ AI ร่างแผน ร่างข้อความ หรือ HTML แล้วปรับด้วยวิจารณญาณทางดนตรีของตน",
    "ตรวจทุกข้อกล่าวอ้าง (คีย์ ฟอร์ม ประวัติ) กับโน้ต/แหล่งจริง",
    "ติดป้ายชัดเมื่อใช้เสียงหรือภาพจาก generative AI",
    "เก็บประวัติ prompt สำคัญและรุ่นเครื่องมือ HTML",
  ],
  ethicsDisclose: [
    "เครื่องมือ + free tier ที่ใช้จริง",
    "งานส่วนไหนที่ AI ช่วย",
    "สิ่งที่ตนแก้หรือตัดทิ้งหลังได้ผลจาก AI",
    "prompt สำคัญ (เต็มหรือสรุป)",
    "คำรับรองว่าตรวจข้อกล่าวอ้างทางดนตรีแล้ว",
  ],
  ethicsDont: [
    "ส่งงานจาก AI ทั้งก้อนโดยไม่เปิดเผย",
    "อ้างข้อเท็จจริงทางดนตรีที่ยังไม่ตรวจ",
    "แทนที่โครงโน้ต MuseScore ด้วยไฟล์เสียง AI อย่างเดียว (เส้นทาง ค)",
    "บังคับเพื่อนใช้เครื่องมือเสียเงิน หรือแชร์รหัสผ่านบัญชี",
  ],

  driveStructure: `ArtTechno_2026/
  00_disclosure/
  01_weekly/
  02_mid_project/
  03_final_project/
  tools/
  scores/
  media/`,

  promptPattern: "Role → Musical context → Constraints → Output format → Critique criteria → Revise instruction",

  midProject: {
    title: "สตูดิโอฝึกซ้อมด้วย AI ของฉัน รุ่นที่ 1",
    titleEn: "My AI Practice Studio v1",
    week: 8,
    date: "21 ก.ย. 2569 (เป้า)",
    weight: "25%",
    presentation: "5–7 นาที",
    purpose:
      "จัดทำชุดฝึกซ้อมส่วนบุคคลที่นำไปใช้ได้จริง สำหรับเครื่องดนตรี/เสียงร้องของตน โดยผสาน AI กับการตัดสินใจทางดนตรีของตนเอง",
    deliverables: [
      "รายงานวินิจฉัยการฝึก 1–2 หน้า PDF",
      "แผนฝึก 4 สัปดาห์ (ปรับหลังใช้จริงอย่างน้อย 1 สัปดาห์)",
      "เครื่องมือ HTML ไฟล์เดียว ≥ 2 คุณสมบัติ",
      "ชิ้นงานดนตรีสั้น (MuseScore / annotation / ร่าง AI ที่วิพากษ์แล้ว)",
      "บันทึกเปิดเผยการใช้ AI",
      "นำเสนอ 5–7 นาที",
    ],
    success: [
      "การวินิจฉัยจำเพาะต่อเครื่อง/เสียงร้อง และตรงจริง",
      "แผนฝึกสมจริงกับภาระชั้นปีที่ 1",
      "เครื่องมือ HTML เปิดจากไฟล์ได้และทำตามที่อ้าง",
      "อธิบายได้ว่า AI พลาดตรงไหนและตนแก้ได้อย่างไร",
      "สาระทางดนตรีมาก่อนความสวยภายนอก",
    ],
  },

  finalProject: {
    week: 15,
    date: "9 พ.ย. 2569 (เป้า)",
    weight: "35%",
    presentation: "8–10 นาที",
    format: "รายบุคคล · เลือก 1 เส้นทาง · ทุกเส้นทางต้องมี disclosure + บันทึกสะท้อนคิด PDF",
    rubric: [
      "สาระและความถูกต้องทางดนตรี",
      "คุณภาพกระบวนการ (การวนซ้ำ multi-step prompt หลักฐานการใช้)",
      "คุณภาพเครื่องมือ/วัสดุ (ใช้ได้ ชัด เหมาะสม)",
      "การสื่อสาร (นำเสนอ + งานเขียนภาษาไทย)",
      "จริยธรรมและการเปิดเผยการใช้ AI",
    ],
  },

  finalTracks: [
    {
      id: "A",
      name: "เส้นทาง ก — ระบบสนับสนุนการฝึกแสดง",
      nameEn: "Performance Practice System",
      focus: "แผนฝึกเชิงลึก + เครื่องมือ HTML โตเต็มที่",
      forWho: "เหมาะกับผู้ที่อยากพัฒนาระบบฝึกซ้อมส่วนตัวให้ลึกและใช้ได้จริงกับบทหลัก/เป้าหมายเทคนิค",
      mustSubmit: [
        "รายงานวินิจฉัยขยาย + ระบบฝึก 8 สัปดาห์ (หรือตลอดภาค)",
        "แอป HTML ไฟล์เดียวที่พัฒนาแล้ว (≥ 3 คุณสมบัติ แสดงประวัติรุ่น)",
        "หลักฐานการใช้งาน (บันทึกเซสชัน บันทึกก่อน–หลัง เสียงอัดจากบ้านได้)",
        "บันทึกสะท้อน “ฉันฝึกกับ AI อย่างไร และจะคงอะไรไว้หลังจบรายวิชา”",
        "บันทึกเปิดเผยการใช้ AI",
      ],
      dontForget: [
        "HTML ต้องเปิดจากไฟล์ได้บนเครื่องแล็บ",
        "แสดงประวัติรุ่นเครื่องมือ",
        "disclosure + บันทึกสะท้อนคิด PDF",
      ],
    },
    {
      id: "B",
      name: "เส้นทาง ข — ค้นคว้าเรเพอร์ทัวร์และออกแบบรายการแสดง",
      nameEn: "Repertoire research & recital design",
      focus: "แฟ้มค้นคว้า + program notes + สื่อผู้ชม",
      forWho: "เหมาะกับผู้ที่สนใจงานค้นคว้า บริบทบทเพลง และการคิดเชิงคอนเสิร์ต/สื่อผู้ชม",
      mustSubmit: [
        "แฟ้มค้นคว้าบทเพลงสำคัญ (หรือชุดบทสั้นที่สัมพันธ์กัน)",
        "Program notes ภาษาไทยเชิงวิชาการ เหมาะกับ student recital",
        "แนวคิดรายการแสดง: ลำดับเพลง เวลา บันทึกเวที",
        "ชุดเข้าถึงผู้ชม: โปสเตอร์/ภาพ + ข้อความประชาสัมพันธ์สั้น",
        "บันทึกเปิดเผยการใช้ AI",
      ],
      dontForget: [
        "ตรวจข้อเท็จจริงกับแหล่งจริง — ห้ามอ้าง AI ล้วน",
        "ตรวจตัวอักษรบนภาพโปสเตอร์ด้วยตา",
        "disclosure + บันทึกสะท้อนคิด PDF",
      ],
    },
    {
      id: "C",
      name: "เส้นทาง ค — เรียบเรียง / ร่างสร้างสรรค์ + เครื่องมือ",
      nameEn: "Creative study: arrangement / draft + tool",
      focus: "โน้ต MuseScore เป็นหลัก + เวิร์กโฟลว์ AI โปร่งใส",
      forWho: "เหมาะกับผู้ที่อยากเรียบเรียง ชิ้นศึกษา หรือ etude โดยมี AI ช่วยภายใต้การควบคุมของมนุษย์",
      mustSubmit: [
        "โจทย์สร้างสรรค์ชัด (เรียบเรียง ชิ้นศึกษา variation หรือ etude)",
        "โน้ตใน MuseScore (โครงหลักบังคับ)",
        "บันทึกเวิร์กโฟลว์ AI: ไอเดีย → คัดเลือก → ลงโน้ต → วิพากษ์",
        "เครื่องมือ HTML สนับสนุน",
        "ย่อหน้าจริยธรรม/ลิขสิทธิ์ + บันทึกเปิดเผยการใช้ AI",
      ],
      dontForget: [
        "ห้ามมีแต่ไฟล์เสียง Suno อย่างเดียว — MuseScore เป็นโครงหลัก",
        "เสียง AI = ร่าง/เดโม ติดป้ายชัด",
        "เคารพลิขสิทธิ์ทำนอง · disclosure ครบ",
      ],
    },
  ],

  resources: [
    {
      group: "ความรู้เท่าทัน AI (เริ่มต้น)",
      items: [
        { title: "Elements of AI", url: "https://www.elementsofai.com/", desc: "คอร์สฟรี ไม่ต้องเขียนโค้ด — อ่านเฉพาะโมดูลสั้น ๆ (What is AI? / Implications)" },
        { title: "Google AI Essentials", url: "https://grow.google/ai-essentials/", desc: "ใช้ GenAI ช่วยงาน + ความรับผิดชอบ (ไม่บังคับทั้งคอร์ส)" },
        { title: "AI for Education — Free student literacy lessons", url: "https://www.aiforeducation.io/free-genai-student-literacy-lessons", desc: "บทเรียนสั้นแนะนำ GenAI สำหรับผู้เรียน" },
      ],
    },
    {
      group: "การเขียน Prompt",
      items: [
        { title: "Google Prompting Essentials", url: "https://www.coursera.org/specializations/prompting-essentials-google", desc: "โครง prompt ชัดเจนทีละขั้น" },
        { title: "Google Cloud — Prompt engineering overview", url: "https://cloud.google.com/discover/what-is-prompt-engineering", desc: "ภาพรวมสั้น ๆ เรื่อง prompt" },
        { title: "AI for Education — Prompt library", url: "https://www.aiforeducation.io/prompts", desc: "แม่แบบ prompt ในห้องเรียน" },
        { title: "AI for Education — Downloadable resources (Five S)", url: "https://www.aiforeducation.io/ai-resources-main", desc: "กรอบ Five S สำหรับนักศึกษา/ครู" },
      ],
    },
    {
      group: "AI กับดนตรี / ห้องเรียนดนตรี",
      items: [
        { title: "Yamaha — AI in the Music Classroom", url: "https://hub.yamaha.com/music-educators/prof-dev/teaching-tips/ai-in-the-music-classroom/", desc: "AI เป็น companion ไม่ใช่ผู้แทน · ความเท่าเทียม · การพึ่งพามากเกินไป" },
        { title: "Yamaha — AI: Where Do I Start?", url: "https://hub.yamaha.com/music-educators/prof-dev/teaching-tips/ai-where-do-i-start/", desc: "จุดเริ่มต้นสำหรับครู/ผู้เรียนใหม่" },
        { title: "Connect for Education — Composing the future with AI", url: "https://www.connect4education.com/composing-the-future-with-ai/", desc: "AI ร่วมสร้าง · agency ของผู้เรียน" },
        { title: "NAfME — AI and Music Education", url: "https://nafme.org/blog/ai-in-education/", desc: "ภาพรวม AI ในดนตรีศึกษา" },
        { title: "Creative AI for Education — Music toolkit", url: "https://creativeaiforeducation.com/ai-for-music-education/", desc: "ทางเลือกเสริม — ตรวจ free access ก่อนใช้" },
      ],
    },
    {
      group: "Vibe coding / สร้างเครื่องมือด้วย AI",
      items: [
        { title: "Build with Andrew (DeepLearning.AI)", url: "https://www.deeplearning.ai/courses/build-with-andrew", desc: "สำหรับคนไม่เคยเขียนโค้ด — แนวคิดเดียวกับแล็บ HTML ของเรา" },
      ],
    },
    {
      group: "จริยธรรม · เปิดเผย · อ้างอิง AI",
      items: [
        { title: "UNESCO — Guidance for generative AI in education and research", url: "https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research", desc: "แนวทาง GenAI แบบมนุษย์เป็นศูนย์กลาง" },
        { title: "UNESCO — AI competency frameworks", url: "https://www.unesco.org/en/articles/what-you-need-know-about-unescos-new-ai-competency-frameworks-students-and-teachers", desc: "กรอบสมรรถนะ AI สำหรับผู้เรียน/ครู" },
        { title: "UNESCO — Recommendation on the Ethics of AI", url: "https://www.unesco.org/en/artificial-intelligence/recommendation-ethics", desc: "มาตรฐานจริยธรรม AI ระดับโลก" },
        { title: "MLA — How to cite generative AI", url: "https://style.mla.org/citing-generative-ai/", desc: "วิธีอ้างอิง / เปิดเผยการใช้ AI" },
        { title: "APA — How to cite ChatGPT", url: "https://apastyle.apa.org/blog/how-to-cite-chatgpt", desc: "แนวทาง APA สำหรับ LLM" },
        { title: "Vanderbilt — Academic integrity & generative AI", url: "https://www.vanderbilt.edu/generative-ai/academic-integrity/", desc: "นโยบายชั้นเรียนและการเปิดเผย" },
      ],
    },
  ],

  weeks: [
    {
      n: 1,
      date: "3 ส.ค. 2569",
      title: "เปิดรายวิชา · AI ในฐานะผู้ร่วมงาน · บัญชี",
      type: "normal",
      graded: true,
      tools: ["Gemini", "Claude", "GPT", "Grok", "Google Drive"],
      goals: [
        "เข้าใจปรัชญารายวิชา: AI = ผู้ร่วมงาน ไม่ใช่ผู้แทน",
        "สร้างบัญชี free tier ที่จำเป็นและโฟลเดอร์ Drive",
        "เริ่มแม่แบบบันทึกเปิดเผยการใช้ AI",
        "เขียนเป้าหมายส่วนตัว 1 หน้า",
      ],
      lab: [
        "ตั้งโฟลเดอร์ ArtTechno_2026 บน Google Drive",
        "สมัคร/เข้า LLM free tier อย่างน้อย 1 ตัว: Gemini, Claude, GPT หรือ Grok",
        "ทดลอง prompt วินิจฉัยการฝึกสั้น ๆ",
        "อ่านกฎ disclosure และลิขสิทธิ์เบื้องต้น",
      ],
      deliverable: "รายการตรวจบัญชี + เป้าหมาย 1 หน้า + เริ่มแม่แบบ disclosure",
      homework: "บนโทรศัพท์: ถาม AI 1 ข้อเกี่ยวกับการฝึกเครื่อง/เสียงของคุณ + บันทึก 3 บรรทัดว่าคำตอบใช้ได้จริงไหม",
      resources: [
        { title: "Elements of AI", url: "https://www.elementsofai.com/" },
        { title: "Google AI Studio", url: "https://aistudio.google.com/" },
        { title: "Claude", url: "https://claude.ai/" },
        { title: "ChatGPT / GPT", url: "https://chatgpt.com/" },
        { title: "Grok", url: "https://grok.com/" },
        { title: "Yamaha — AI in the Music Classroom", url: "https://hub.yamaha.com/music-educators/prof-dev/teaching-tips/ai-in-the-music-classroom/" },
        { title: "UNESCO GenAI guidance", url: "https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research" },
        { title: "MLA citing generative AI", url: "https://style.mla.org/citing-generative-ai/" },
      ],
      samplePrompt: `You are a supportive practice coach for a first-year [instrument/voice] student.
Context: I am preparing [piece or skill]. My current challenges: [list 2–3].
Constraints: Free practice only, max 45 minutes/day, no paid apps.
Output: 5 diagnosis questions I should answer honestly about my practice.
Then wait for my answers before giving a plan.`,
      tips: ["นำหูฟังมาทุกคาบ", "free tier เท่านั้น", "อย่าส่งรหัสผ่านบัญชีให้ใคร"],
    },
    {
      n: 2,
      date: "10 ส.ค. 2569",
      title: "Local AI + Agentic Workflow บน Windows 11",
      type: "normal",
      graded: true,
      tools: ["Windows 11", "PowerShell", "Ollama", "Nemotron (teacher demo)"],
      goals: [
        "ติดตั้งและตรวจสอบ Ollama บน Windows 11 ได้อย่างปลอดภัย",
        "เลือกและรันโมเดลฟรีในเครื่องเพียง 1 โมเดลตามความพร้อมของ PC",
        "ใช้ agentic workflow แบบ goal → plan → approval → verify โดยมนุษย์เป็นผู้ควบคุม",
      ],
      lab: [
        "ติดตั้ง Ollama → รันโมเดลฟรีหนึ่งตัว → ตรวจผลด้วยคำสั่งพื้นฐาน",
        "เปรียบเทียบ model cards แล้วอธิบายเหตุผลที่เลือกโมเดลนั้น",
        "ทำ mini-project แบบ agentic และบันทึกสิ่งที่ AI เสนอ สิ่งที่มนุษย์อนุมัติ และผลที่ตรวจ",
      ],
      deliverable: "ภาพ/บันทึกการติดตั้ง + prompt log + agent log + disclosure",
      homework: "เลือก mini-project 1 ชิ้น แล้วทำ agentic workflow 1 รอบพร้อมบันทึกการอนุมัติและการตรวจของตนเอง",
      resources: [
        { title: "Ollama — ดาวน์โหลดสำหรับ Windows", url: "https://ollama.com/download/windows" },
        { title: "Ollama — คู่มือ Windows", url: "https://docs.ollama.com/windows" },
        { title: "Ollama — Cloud model guide", url: "https://docs.ollama.com/cloud" },
        { title: "Ollama — คลังโมเดลฟรี", url: "https://ollama.com/library" },
      ],
      samplePrompt: `You are a careful study assistant.
Task: Explain one concept from this week's class.
Context: I am a first-year music student in Thailand.
Constraints: Use Thai with English technical terms in parentheses. Do not invent sources.
Output format: 5 bullet points, then 2 questions to check my understanding.
Check: Mark anything that I should verify myself.`,
      tips: ["นักศึกษาใช้ local model เพียง 1 ตัว; cloud Nemotron เป็นการสาธิตโดยอาจารย์", "agentic workflow: Goal → Plan → Approve → Act → Verify → Log & revise"],
    },
    {
      n: 3,
      date: "17 ส.ค. 2569",
      title: "Vibe coding 101 · เครื่องมือ HTML แรก",
      type: "normal",
      graded: true,
      tools: ["Gemini", "Claude", "GPT", "HTML tool"],
      goals: [
        "เข้าใจวงจร: ตั้งใจ → prompt → บันทึก HTML → เปิดเบราว์เซอร์ → แก้",
        "ได้เครื่องมืออย่างน้อย 1 คุณสมบัติ (เมโทรนอมหรือตัวจับเวลา)",
      ],
      lab: [
        "เขียนเจตนาทางดนตรีสั้น ๆ (ไทยหรืออังกฤษ)",
        "ให้ Gemini/Claude สร้างไฟล์ HTML เดียว",
        "บันทึก tool-w3.html ทดสอบ ปรับ 2–3 รอบ",
      ],
      deliverable: "`tool-w3.html` + บันทึกการปรับแก้สั้น ๆ",
      homework: "ใช้เครื่องมือตอนฝึก 1 ครั้ง จดว่าขาดอะไร",
      resources: [
        { title: "Build with Andrew", url: "https://www.deeplearning.ai/courses/build-with-andrew" },
        { title: "Google AI Studio", url: "https://aistudio.google.com/" },
      ],
      samplePrompt: `Create a single-file HTML (CSS+JS inline) music practice tool.
Features: metronome with BPM input (40–200), start/stop, optional 4-beat accent.
Design: simple, large buttons, works offline when opening the file.
No external libraries. Comments in English. UI labels can be English.`,
      tips: ["เก็บรุ่น tool-v1.html, tool-v2.html", "ถ้าพัง ให้ LLM ที่สอง (Claude) ดีบัก", "ห้ามต้องติดตั้งเซิร์ฟเวอร์"],
    },
    {
      n: 4,
      date: "24 ส.ค. 2569",
      title: "ทฤษฎีและวิเคราะห์ด้วย AI",
      type: "normal",
      graded: true,
      tools: ["MuseScore", "Gemini", "GPT"],
      goals: [
        "วิเคราะห์ช่วงสั้นจากเรเพอร์ทัวร์ของตน",
        "ตรวจทุกข้อกล่าวอ้างของ AI กับโน้ตจริง",
      ],
      lab: [
        "เปิดช่วงโน้ตใน MuseScore / PDF",
        "ให้ LLM ช่วยวิเคราะห์ form / harmony / phrase",
        "มาร์กจุดที่ AI ผิดบนโน้ต",
      ],
      deliverable: "แผ่นวิเคราะห์ + ช่วงโน้ตมี annotation",
      homework: "ถาม AI 1 คำถามทฤษฎี แล้วตรวจกับตำรา/อาจารย์เดี่ยว",
      resources: [
        { title: "MuseScore", url: "https://musescore.org/" },
        { title: "IMSLP", url: "https://imslp.org/" },
      ],
      samplePrompt: `You are a music theory tutor. I will describe a short excerpt.
Piece: [title/composer]. Measures [x–y]. Key signature / time: [ ].
My observations: [ ].
Explain form, harmonic outline, and performance implications for [instrument/voice].
Flag uncertainty. Do not invent Roman numerals you cannot justify.
I will verify against the score.`,
      tips: ["AI วิเคราะห์โน้ตผิดได้บ่อย — หูและตาคุณสำคัญกว่า", "อย่าส่งโน้ตที่มีลิขสิทธิ์ทั้งเล่มขึ้นคลาวด์โดยไม่จำเป็น"],
    },
    {
      n: 5,
      date: "31 ส.ค. 2569",
      title: "ค้นคว้าเรเพอร์ทัวร์ · NotebookLM / แหล่ง",
      type: "normal",
      graded: true,
      tools: ["NotebookLM", "IMSLP", "GPT", "Grok"],
      goals: [
        "สร้างชุดแหล่งสำหรับบทเพลงหนึ่ง",
        "ร่าง program note ย่อหน้าเดียวอย่างโปร่งใสเรื่อง AI",
      ],
      lab: [
        "รวบรวม PDF/ลิงก์แหล่ง (สาธารณสมบัติหรืออ้างได้)",
        "ทดลอง NotebookLM จากไฟล์ที่อัปโหลด",
        "เขียนย่อหน้า + disclosure",
      ],
      deliverable: "สรุปค้นคว้าย่อ + disclosure",
      homework: "หาแหล่งเพิ่ม 1 ชิ้นที่ AI ไม่ได้เสนอ",
      resources: [
        { title: "NotebookLM", url: "https://notebooklm.google.com/" },
        { title: "MLA citing generative AI", url: "https://style.mla.org/citing-generative-ai/" },
        { title: "APA cite ChatGPT", url: "https://apastyle.apa.org/blog/how-to-cite-chatgpt" },
      ],
      samplePrompt: `Using only the facts I provide below (do not invent sources), draft a 120-word program note in clear Academic Thai outline (I will polish).
Facts: [composer dates, work year, form, historical notes, performance issues].
If a fact is missing, write [NEED SOURCE] instead of guessing.`,
      tips: ["แหล่งจริงมาก่อน AI", "ห้าม copy ย่อหน้า AI ทั้งก้อนเป็นงานส่ง"],
    },
    {
      n: 6,
      date: "7 ก.ย. 2569",
      title: "ดนตรีสร้างด้วย AI อย่างมีวิจารณญาณ (Suno)",
      type: "normal",
      graded: true,
      tools: ["Suno", "ACE Studio"],
      goals: [
        "สร้างร่างเสียง 2–3 ชิ้นและวิพากษ์ด้วยเกณฑ์ทางดนตรี",
        "ใช้เครดิต free อย่างมีสติ",
      ],
      lab: [
        "กำหนดเป้าดนตรีชัด (อารมณ์ ฟอร์ม เครื่อง)",
        "generate บน Suno (หรือทางเลือกฟรี)",
        "เขียน critique log: ได้อะไร / ผิดตรงไหน / จะเอาอะไรไปต่อบนโน้ต",
      ],
      deliverable: "บันทึกวิพากษ์ 2–3 ชิ้น + บันทึกการตัดสินใจ",
      homework: "ฟังร่าง 1 ชิ้นอีกครั้งด้วยคะแนน แล้วปรับ 1 ประโยคในบันทึก",
      resources: [
        { title: "Suno", url: "https://suno.com/" },
        { title: "Connect for Education — AI composing", url: "https://www.connect4education.com/composing-the-future-with-ai/" },
        { title: "Yamaha — AI in the Music Classroom", url: "https://hub.yamaha.com/music-educators/prof-dev/teaching-tips/ai-in-the-music-classroom/" },
      ],
      samplePrompt: `Instrumental study sketch for [instrument], tempo [ ], mood [ ], form ABA about 60–90 seconds.
No vocals. Simple harmony. Suitable as a practice warm-up demo, not a final composition.`,
      tips: ["เสียง AI = ร่าง/เดโม ติดป้ายชัด", "คะแนนอยู่ที่การวิพากษ์ ไม่ใช่ความพรีเมียมของคลิป"],
    },
    {
      n: 7,
      date: "14 ก.ย. 2569",
      title: "สัปดาห์สร้างโครงงานกลางภาค",
      type: "build",
      graded: true,
      tools: ["HTML tool", "Gemini"],
      goals: [
        "รวมวินิจฉัย + แผนฝึก + เครื่องมือ HTML เป็นชุดร่าง",
        "ให้เพื่อนทดสอบเครื่องมือ",
      ],
      lab: [
        "เช็กลิสต์ชิ้นงานกลางภาค",
        "เพิ่มคุณสมบัติ HTML ให้ครบ ≥ 2",
        "peer test 15 นาทีท้าย",
      ],
      deliverable: "ร่างชุดกลางภาค (ยังไม่สมบูรณ์ได้)",
      homework: "ใช้แผนฝึกจริง 1 วัน + อัปเดตบันทึกสิ่งที่ได้ผล/ไม่ได้ผล",
      resources: [
        { title: "หน้าโครงงานกลางภาค", url: "projects.html#mid" },
      ],
      samplePrompt: null,
      tips: ["อย่าเริ่ม disclosure วันนำเสนอ", "เครื่องมือต้องเปิดจากไฟล์ได้บนเครื่องแล็บ"],
    },
    {
      n: 8,
      date: "21 ก.ย. 2569",
      title: "นำเสนอโครงงานกลางภาค",
      type: "assessment",
      graded: true,
      milestone: true,
      milestoneLabel: "โครงงานกลางภาค · 25% · นำเสนอ 5–7 นาที",
      tools: [],
      goals: [
        "นำเสนอ 5–7 นาที ชัดเจนเรื่องปัญหาดนตรี + บทบาท AI + สิ่งที่ตนแก้",
        "ส่งชุดกลางภาคสมบูรณ์",
      ],
      lab: [
        "นำเสนอตามคิว",
        "รับ feedback",
        "เก็บไฟล์ชุดสุดท้ายบน Drive",
      ],
      deliverable: "ชุดกลางภาคสมบูรณ์ (diagnosis, routine, HTML, musical artifact, disclosure)",
      homework: "จด 3 สิ่งจะต่อยอดสู่ปลายภาค",
      resources: [
        { title: "รายละเอียดโครงงานกลางภาค", url: "projects.html#mid" },
      ],
      samplePrompt: null,
      tips: ["สาระทางดนตรี > ความสวย UI", "ซ้อมจับเวลา"],
    },
    {
      n: 9,
      date: "28 ก.ย. 2569",
      title: "คิดเชิงรายการแสดงและแบบจำลองผู้ชม",
      type: "normal",
      graded: true,
      tools: ["Gemini", "GPT", "Grok"],
      goals: [
        "ออกแบบลำดับเพลงและ persona ผู้ชม",
        "ร่างข้อความ/แนวภาพโปสเตอร์ด้วยเครื่องมือฟรี",
      ],
      lab: [
        "เขียน mini recital concept 1 หน้า",
        "ทดลองข้อความประชาสัมพันธ์ + ภาพฟรี",
        "ตรวจภาษาไทยบนโปสเตอร์ด้วยตา",
      ],
      deliverable: "แนวคิด mini recital 1 หน้า",
      homework: "ถามเพื่อน 1 คนว่าข้อความโปสเตอร์เข้าใจไหม",
      resources: [
        { title: "Google AI Essentials", url: "https://grow.google/ai-essentials/" },
      ],
      samplePrompt: `Audience persona: [age, music background, why they come].
Draft a short Thai social caption (max 80 words) and English title for a student recital featuring [pieces].
Tone: warm, professional, not salesy. Flag any claim I must verify.`,
      tips: ["ตัวอักษรบนภาพ AI มักผิด — วางข้อความใหม่เองถ้าจำเป็น"],
    },
    {
      n: 10,
      date: "5 ต.ค. 2569",
      title: "Vibe coding ขั้นสูง · เครื่องมือหลายคุณสมบัติ",
      type: "normal",
      graded: true,
      tools: ["HTML tool", "Claude", "Gemini", "GPT"],
      goals: [
        "ขยายเครื่องมือเป็น 2–3 คุณสมบัติ แบบค่อยเป็นค่อยไป",
        "ฝึกดีบักด้วย LLM ที่สอง",
      ],
      lab: [
        "ต่อจาก tool เดิมหรือเริ่มรุ่นใหม่",
        "เพิ่มเช่น checklist ฝึก, บันทึกเซสชัน, quiz ช่วงเสียง",
        "peer test",
      ],
      deliverable: "`tool-w10.html` ขั้นสูง",
      homework: "ใช้ตอนฝึกจริง 1 ครั้ง",
      resources: [
        { title: "Build with Andrew", url: "https://www.deeplearning.ai/courses/build-with-andrew" },
      ],
      samplePrompt: `Here is my current single-file HTML tool: [paste or describe].
Add feature: practice checklist with localStorage save, without breaking metronome.
Keep one file only. Explain what you changed in 5 bullets.`,
      tips: ["ทีละคุณสมบัติ — อย่าขอ 10 อย่างใน prompt เดียว"],
    },
    {
      n: 11,
      date: "12 ต.ค. 2569",
      title: "แล็บเรียบเรียง / ร่างสร้างสรรค์",
      type: "normal",
      graded: true,
      tools: ["MuseScore", "Suno"],
      goals: [
        "เริ่ม arrangement หรือ etude ใน MuseScore",
        "ใช้ AI เป็นแหล่งไอเดีย แล้วมนุษย์กรอง",
      ],
      lab: [
        "กำหนดโจทย์สร้างสรรค์ 1 ข้อ",
        "ขอไอเดียจาก AI → คัด 1–2 แนว",
        "ลงโน้ตโครงหลักใน MuseScore",
      ],
      deliverable: "ร่างโน้ต v1 (.mscz + PDF)",
      homework: "เล่น/ร้องร่าง แล้วมาร์กจุดแก้",
      resources: [
        { title: "MuseScore", url: "https://musescore.org/" },
        { title: "Connect for Education — AI composing", url: "https://www.connect4education.com/composing-the-future-with-ai/" },
      ],
      samplePrompt: `Suggest 3 simple arrangement approaches of [melody/public-domain tune] for [instrument] + optional piano.
Level: first-year college. Each idea: texture, range risks, 2 practice tips.
I will notate myself in MuseScore; do not output full long scores.`,
      tips: ["ห้ามมีแต่ไฟล์ Suno อย่างเดียวในเส้นทางสร้างสรรค์", "เคารพลิขสิทธิ์ทำนอง"],
    },
    {
      n: 12,
      date: "19 ต.ค. 2569",
      title: "เลือกเส้นทางปลายภาคและลงลึก",
      type: "normal",
      graded: true,
      tools: [],
      goals: [
        "เลือก Track A / B / C",
        "เขียนข้อเสนอโครงงานสั้น + ทบทวนรูบริก",
      ],
      lab: [
        "เวิร์กช็อปเส้นทาง",
        "วางแผนชิ้นงานและไทม์ไลน์ถึงสัปดาห์ 15",
        "เริ่มรวบรวมหลักฐาน",
      ],
      deliverable: "ข้อเสนอโครงงานปลายภาค + แบบเลือกเส้นทาง",
      homework: "ทำงานตามข้อเสนอ 25–40 นาที",
      resources: [
        { title: "โครงงานปลายภาค", url: "projects.html#final" },
      ],
      samplePrompt: null,
      tips: ["เลือกเส้นทางที่รองรับเรเพอร์ทัวร์/เป้าหมายจริงของคุณ"],
    },
    {
      n: 13,
      date: "26 ต.ค. 2569",
      title: "แล็บผลิต 1",
      type: "build",
      graded: true,
      tools: ["HTML tool", "MuseScore"],
      goals: ["สร้างชุดปลายภาคอย่างมีจุดตรวจ", "แก้ช่องว่างจากข้อเสนอ"],
      lab: [
        "ทำงานลึกตาม track",
        "checkpoint กับอาจารย์",
        "อัปเดต disclosure ต่อเนื่อง",
      ],
      deliverable: "จุดตรวจความก้าวหน้า (PDF + ไฟล์)",
      homework: "ปิด 1 ช่องว่างที่ checkpoint ชี้",
      resources: [
        { title: "UNESCO GenAI guidance", url: "https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research" },
      ],
      samplePrompt: null,
      tips: ["ส่งชื่อไฟล์ตามรูปแบบ W13_Surname_..."],
    },
    {
      n: 14,
      date: "2 พ.ย. 2569",
      title: "แล็บผลิต 2 · ปรับและทบทวนจริยธรรม",
      type: "build",
      graded: true,
      tools: [],
      goals: [
        "peer review งานและความครบของ disclosure",
        "ซ้อมนำเสนอ",
      ],
      lab: [
        "แลกงานกับเพื่อนตาม checklist",
        "ตรวจลิขสิทธิ์ / ป้ายเสียง AI",
        "ซ้อมจับเวลา 8–10 นาที",
      ],
      deliverable: "ชุดงานใกล้สมบูรณ์",
      homework: "ปรับตาม peer feedback + พักเสียง/มือก่อน showcase",
      resources: [
        { title: "Vanderbilt — Academic integrity & AI", url: "https://www.vanderbilt.edu/generative-ai/academic-integrity/" },
        { title: "MLA citing generative AI", url: "https://style.mla.org/citing-generative-ai/" },
      ],
      samplePrompt: null,
      tips: ["disclosure ไม่ครบ = เสี่ยงคะแนน ethics"],
    },
    {
      n: 15,
      date: "9 พ.ย. 2569",
      title: "Final showcase",
      type: "assessment",
      graded: true,
      milestone: true,
      milestoneLabel: "โครงงานปลายภาค · 35% · นำเสนอ 8–10 นาที",
      tools: [],
      goals: [
        "นำเสนอชุดปลายภาค",
        "สะท้อนสิ่งที่จะคงไว้หลังจบรายวิชา",
      ],
      lab: [
        "showcase ตามคิว",
        "ส่งชุดไฟล์สุดท้าย",
        "ปิดรายวิชา",
      ],
      deliverable: "ชุดปลายภาคสมบูรณ์ + disclosure + บันทึกสะท้อน",
      homework: "—",
      resources: [
        { title: "โครงงานปลายภาค", url: "projects.html#final" },
      ],
      samplePrompt: null,
      tips: [
        "เก็บชุด prompt ส่วนตัวและเครื่องมือ HTML ที่ใช้ได้จริงไว้หลังเทอม",
        "ทักษะสำคัญคือการประเมินเครื่องมือใหม่ ไม่ใช่ท่องแบรนด์",
      ],
    },
  ],
};
