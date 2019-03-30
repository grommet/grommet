export const utilization = [
  {
    name: 'CPU',
    value: '100 GHz Total',
    used: true,
    usedValue: '58 GHz',
    avaialble: false,
    availableValue: '42 GHz',
    percent: 55,
  },
  {
    name: 'Memory',
    value: '200 GB Total',
    used: true,
    usedValue: '127 GB',
    avaialble: false,
    availableValue: '73 GB',
    percent: 78,
  },
  {
    name: 'Storage',
    value: '1000 TB Total',
    used: true,
    usedValue: '275 TB',
    avaialble: false,
    availableValue: '725 TB',
    percent: 27,
  },
];

export const hardware = {
  Hypervisor: {
    name: 'Hypervisor',
    hardware: 'ESXi 5.1.0',
  },
  Hardware: {
    name: 'Hardware',
    hardware: 'HPE Simplivity 380',
  },
};

export const vms = {
  name: 'Virtual Machines',
  count: 126,
  On: 88,
  Off: 36,
  Suspended: 2,
};

export const notification = {
  action: 'Fix Alert',
  date: 'June 10, 2018, 4:38 am',
  message: 'Inconsistent configuration detected on Grommet Eval 6.',
};
