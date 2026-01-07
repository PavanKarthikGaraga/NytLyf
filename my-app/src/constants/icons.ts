// Icon names for @expo/vector-icons (Ionicons, MaterialIcons, Feather)
// No emojis - icons only

export const ICONS = {
  // Navigation Icons
  nav: {
    home: 'home',
    homeFilled: 'home-filled',
    explore: 'compass',
    exploreFilled: 'compass-filled',
    categories: 'grid',
    categoriesFilled: 'grid-filled',
    saved: 'bookmark',
    savedFilled: 'bookmark-filled',
    profile: 'person',
    profileFilled: 'person-filled',
  },

  // Action Icons
  action: {
    search: 'search',
    filter: 'options',
    share: 'share-social',
    save: 'bookmark-outline',
    saved: 'bookmark',
    back: 'arrow-back',
    close: 'close',
    more: 'ellipsis-horizontal',
    add: 'add',
    edit: 'create',
    delete: 'trash',
    refresh: 'refresh',
    settings: 'settings',
    notification: 'notifications',
    notificationFilled: 'notifications',
  },

  // Event Category Icons
  category: {
    party: 'musical-notes',
    concert: 'mic',
    meetup: 'people',
    exclusive: 'diamond',
    festival: 'sparkles',
    clubbing: 'disc',
    rooftop: 'sunny',
    liveMusic: 'radio',
    comedy: 'happy',
    networking: 'git-network',
  },

  // Info Icons
  info: {
    location: 'location',
    locationFilled: 'location',
    time: 'time',
    calendar: 'calendar',
    calendarFilled: 'calendar',
    price: 'pricetag',
    priceFilled: 'pricetag',
    ticket: 'ticket',
    star: 'star',
    starFilled: 'star',
    heart: 'heart-outline',
    heartFilled: 'heart',
    fire: 'flame',
    trending: 'trending-up',
    live: 'radio',
  },

  // UI Icons
  ui: {
    chevronRight: 'chevron-forward',
    chevronLeft: 'chevron-back',
    chevronDown: 'chevron-down',
    chevronUp: 'chevron-up',
    arrowRight: 'arrow-forward',
    arrowLeft: 'arrow-back',
    check: 'checkmark',
    checkCircle: 'checkmark-circle',
    error: 'alert-circle',
    warning: 'warning',
    info: 'information-circle',
    eye: 'eye',
    eyeOff: 'eye-off',
    lock: 'lock-closed',
    unlock: 'lock-open',
    mail: 'mail',
    phone: 'call',
    user: 'person',
    users: 'people',
    camera: 'camera',
    image: 'image',
    gallery: 'images',
    play: 'play',
    pause: 'pause',
    volume: 'volume-high',
    mute: 'volume-mute',
  },

  // Social Icons
  social: {
    instagram: 'logo-instagram',
    twitter: 'logo-twitter',
    facebook: 'logo-facebook',
    whatsapp: 'logo-whatsapp',
    linkedin: 'logo-linkedin',
    youtube: 'logo-youtube',
    link: 'link',
  },

  // Status Icons
  status: {
    verified: 'shield-checkmark',
    premium: 'diamond',
    hot: 'flame',
    new: 'sparkles',
    soldOut: 'close-circle',
    fewLeft: 'alert',
    available: 'checkmark-circle',
  },

  // Profile & Settings
  profile: {
    help: 'help-circle',
    support: 'chatbubble-ellipses',
    terms: 'document-text',
    privacy: 'shield',
    logout: 'log-out',
    deleteAccount: 'trash-bin',
    language: 'language',
    theme: 'moon',
    about: 'information-circle',
  },
} as const;

export type IconName = string;

