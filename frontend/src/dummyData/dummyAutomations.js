export const dummyAutomations = [
  {
    id: 1,
    name: "Automation 1",
    time: "12:00",
    weekdays: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: true,
      sunday: true,
    },

    devices: [
      {
        id: 1,
        name: "Bathroom Light",
        type: "light",
      },
      {
        id: 2,
        name: "Bedroom Light",
        type: "light",
      },
      {
        id: 3,
        name: "Kitchen Light",
        type: "light",
      },
    ],
  },
  {
    id: 2,
    name: "Automation 2",
    time: "18:00",
    weekdays: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: true,
    },

    devices: [
      {
        id: 3,
        name: "Kitchen Light",
        type: "light",
      },
    ],
  },
  {
    id: 4,
    name: "Automation 4",
    time: "20:00",
    weekdays: {
      monday: true,
      tuesday: true,
      wednesday: false,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false,
    },

    devices: [
      {
        id: 4,
        name: "Bathroom Light",
        type: "light",
      },
      {
        id: 5,
        name: "Bedroom Light",
        type: "light",
      },
    ],
  },
  {
    id: 3,
    name: "Automation 3",
    time: "20:00",
    weekdays: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false,
    },

    devices: [
      {
        id: 4,
        name: "Bathroom Light",
        type: "light",
      },
      {
        id: 5,
        name: "Bedroom Light",
        type: "light",
      },
    ],
  },
];
