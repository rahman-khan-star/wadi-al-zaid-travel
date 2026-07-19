/* ============================================
   TEAM DATA CMS - Shared between Admin & Public
   Uses localStorage for data persistence
   ============================================ */

const TeamCMS = {
  STORAGE_KEY: 'wz_team_members',

  DEFAULT_DATA: [
    { id:'EMP-001', firstName:'Khalid', lastName:'Al-Balushi', photo:'', email:'khalid@wadialzaid.com', phone:'+971 50 111 2233', position:'General Manager', department:'management', bio:'Overseeing all operations with 15+ years of travel industry experience.', socials:{}, order:1, active:true, joinDate:'2020-03-15' },
    { id:'EMP-002', firstName:'Sarah', lastName:'Johnson', photo:'', email:'sarah@wadialzaid.com', phone:'+971 50 222 3344', position:'Senior Tour Guide', department:'guides', bio:'Specializing in Maldives and Southeast Asian destinations with 8 years of guiding experience.', socials:{}, order:2, active:true, joinDate:'2021-06-01' },
    { id:'EMP-003', firstName:'Marco', lastName:'Rossi', photo:'', email:'marco@wadialzaid.com', phone:'+971 50 333 4455', position:'Tour Guide', department:'guides', bio:'European travel expert covering Italy, France, and Greece tours.', socials:{}, order:3, active:true, joinDate:'2022-01-10' },
    { id:'EMP-004', firstName:'Fatima', lastName:'Al-Nuaimi', photo:'', email:'fatima@wadialzaid.com', phone:'+971 50 444 5566', position:'Sales Manager', department:'sales', bio:'Leading the sales team to deliver exceptional travel packages worldwide.', socials:{}, order:4, active:true, joinDate:'2021-03-20' },
    { id:'EMP-005', firstName:'Yuki', lastName:'Tanaka', photo:'', email:'yuki@wadialzaid.com', phone:'+971 50 555 6677', position:'Tour Guide', department:'guides', bio:'Japan and East Asia specialist with deep cultural knowledge.', socials:{}, order:5, active:true, joinDate:'2022-05-15' },
    { id:'EMP-006', firstName:'Ahmed', lastName:'Hassan', photo:'', email:'ahmed.h@wadialzaid.com', phone:'+971 50 666 7788', position:'Customer Support Lead', department:'support', bio:'Ensuring every traveler gets 24/7 support before, during, and after their trip.', socials:{}, order:6, active:true, joinDate:'2021-08-01' },
  ],

  init() {
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.DEFAULT_DATA));
    }
  },

  getAll() {
    this.init();
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY));
  },

  getActive() {
    return this.getAll().filter(m => m.active).sort((a, b) => a.order - b.order);
  },

  getById(id) {
    return this.getAll().find(m => m.id === id);
  },

  add(member) {
    const all = this.getAll();
    member.id = 'EMP-' + String(all.length + 1).padStart(3, '0');
    member.order = all.length + 1;
    member.active = true;
    all.push(member);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(all));
    return member;
  },

  update(id, data) {
    const all = this.getAll();
    const idx = all.findIndex(m => m.id === id);
    if (idx !== -1) {
      all[idx] = { ...all[idx], ...data };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(all));
      return all[idx];
    }
    return null;
  },

  delete(id) {
    let all = this.getAll();
    all = all.filter(m => m.id !== id);
    all.forEach((m, i) => m.order = i + 1);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(all));
  },

  toggleActive(id) {
    const all = this.getAll();
    const m = all.find(x => x.id === id);
    if (m) { m.active = !m.active; localStorage.setItem(this.STORAGE_KEY, JSON.stringify(all)); }
    return m;
  },

  moveUp(id) {
    const all = this.getAll();
    const idx = all.findIndex(m => m.id === id);
    if (idx > 0) {
      [all[idx - 1], all[idx]] = [all[idx], all[idx - 1]];
      all.forEach((m, i) => m.order = i + 1);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(all));
    }
  },

  moveDown(id) {
    const all = this.getAll();
    const idx = all.findIndex(m => m.id === id);
    if (idx < all.length - 1) {
      [all[idx], all[idx + 1]] = [all[idx + 1], all[idx]];
      all.forEach((m, i) => m.order = i + 1);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(all));
    }
  },

  getAvatar(name) {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=e8952f&color=fff&rounded=true&size=200&bold=true`;
  },

  getPhoto(member) {
    if (member.photo) return member.photo;
    return this.getAvatar(member.firstName + '+' + member.lastName);
  },

  deptLabel(d) {
    const map = { management:'Management', sales:'Sales', support:'Customer Support', guides:'Tour Guides', marketing:'Marketing', finance:'Finance', hr:'HR', it:'IT' };
    return map[d] || d;
  }
};

TeamCMS.init();
