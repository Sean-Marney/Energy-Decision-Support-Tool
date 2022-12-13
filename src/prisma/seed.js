const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
async function main() {

// Cardiff University Data 
  await prisma.organisation.create({
    data: {
      id: '1',
      name: 'Cardiff University',
    },
})
//Cardiff University Users
  await prisma.user.create({
    data: {
      id: '1',
      name: 'CardiffAdmin',
      email: 'Admin@cardiff.co.uk',
      password: '$2a$12$btJqTtu4KlORh1RzUJj7OeHPhE7IvZqJ1HyNO0sG.SQADNZAtZiaG', //password
      role: 'admin',
      organisationID: '1',
    },
})
  await prisma.user.create({
    data: {
      id: '2',
      name: 'CardiffManager',
      email: 'Manager@cardiff.co.uk',
      password: '$2a$12$btJqTtu4KlORh1RzUJj7OeHPhE7IvZqJ1HyNO0sG.SQADNZAtZiaG', //password
      role: 'manager',
      organisationID: '1',
    },
  })

//Cardiff University Sites
    await prisma.site.create({
        data: {
          name: 'Abacws',
          organisation: organisation 
        },
    })

    await prisma.site.create({
        data: {
          name: 'Students Union',
          organisation: organisation
        },
    })

//Cardiff University Site 1 Optimisations Data
    await prisma.optimisations.create({
        data: {
          organisationID: '1',
          //siteID: "1",
          priority: '3',
          title: 'Reduce number of computers',
          body: 'Reduces electricity consumption and cost',
          archived: false,
        },
    })
    
    await prisma.optimisations.create({
        data: {
          organisationID: '1',
          //siteID: "1",
          priority: '2',
          title: 'Reduce heating',
          body: 'Reduces electricity consumption and cost in the summer',
          archived: false,
        },
    })

    await prisma.optimisations.create({
        data: {
          organisationID: '1',
          //siteID: "1",
          priority: '1',
          title: 'Install solar panels',
          body: 'Generate own electricity',
          archived: false,
        },
    })

    await prisma.optimisations.create({
        data: {
          organisationID: '1',
          //siteID: "1",
          priority: '1',
          title: 'Turn off lights',
          body: 'Turn off lights to save cost',
          archived: false,
        },
    })

//Cardiff University Site 2 Optimisation Data 
await prisma.optimisations.create({
  data: {
    organisationID: '1',
    //siteID: "2",
    priority: '2',
    title: 'Change to LED',
    body: 'Reduces electricity consumption and cost',
    archived: false,
  },
})

await prisma.optimisations.create({
  data: {
    organisationID: '1',
    //siteID: "2",
    priority: '1',
    title: 'Install solar panels',
    body: 'Generate own electricity',
    archived: false,
  },
})


//Cardiff University Site 1 Target data 
    await prisma.targets.create({
        data: {
          title: 'weeklyCostTarget',
          name: 'cost',
          value: '10000',
          timeframe: 'weekly',
          //siteID: "1",
          organisationID: '1',
        },
    })

    await prisma.targets.create({
        data: {
          title: 'monthylCostTarget',
          name: 'cost',
          value: '40000',
          timeframe: 'monthly',
          //siteID: "1",
          organisationID: '1',
        },
    })

    
    await prisma.targets.create({
        data: {
          title: 'weelyEnergyTarget',
          name: 'energy',
          value: '60000',
          timeframe: 'weekly',
          //siteID: "1",
          organisationID: '1',
        },
    })

    await prisma.targets.create({
        data: {
          title: 'monthlyEnergyTarget',
          name: 'energy',
          value: '150000',
          timeframe: 'monthly',
          //siteID: "1",
          organisationID: '1',
        },
    })

    await prisma.targets.create({
        data: {
          title: 'weelyCarbonTarget',
          name: 'carbon',
          value: '20',
          timeframe: 'weekly',
          //siteID: "1",
          organisationID: '1',
        },
    })

    await prisma.targets.create({
        data: {
          title: 'monthlyCarbonTarget',
          name: 'carbon',
          value: '30',
          timeframe: 'monthly',
          //siteID: "1",
          organisationID: '1',
        },
    })
   
// Cardiff University targets data site 2

await prisma.targets.create({
  data: {
    title: 'weeklyCostTarget',
    name: 'cost',
    value: '20000',
    timeframe: 'weekly',
    //siteID: "2",
    organisationID: '1',
  },
})

await prisma.targets.create({
  data: {
    title: 'monthylCostTarget',
    name: 'cost',
    value: '30000',
    timeframe: 'monthly',
    //siteID: "2",
    organisationID: '1',
  },
})


await prisma.targets.create({
  data: {
    title: 'weelyEnergyTarget',
    name: 'energy',
    value: '70000',
    timeframe: 'weekly',
    //siteID: "2",
    organisationID: '1',
  },
})

await prisma.targets.create({
  data: {
    title: 'monthlyEnergyTarget',
    name: 'energy',
    value: '190000',
    timeframe: 'monthly',
    //siteID: "2",
    organisationID: '1',
  },
})

await prisma.targets.create({
  data: {
    title: 'weelyCarbonTarget',
    name: 'carbon',
    value: '25',
    timeframe: 'weekly',
    //siteID: "2",
    organisationID: '1',
  },
})

await prisma.targets.create({
  data: {
    title: 'monthlyCarbonTarget',
    name: 'carbon',
    value: '50',
    timeframe: 'monthly',
    //siteID: "2",
    organisationID: '1',
  },
})
    

// -----------------------------------------------------------------------------------


// NHS Data
await prisma.organisation.create({
  data: {
    id: '2',
    name: 'NHS',
  },
})

//NHS users Data
await prisma.user.create({
  data: {
    id: '1',
    name: 'NHSAdmin',
    email: 'Admin@nhs.co.uk',
    password: '$2a$12$btJqTtu4KlORh1RzUJj7OeHPhE7IvZqJ1HyNO0sG.SQADNZAtZiaG', //password
    role: 'admin',
    organisationID: '2',
  },
})
await prisma.user.create({
  data: {
    id: '2',
    name: 'nhsManager',
    email: 'Manager@nhs.co.uk',
    password: '$2a$12$btJqTtu4KlORh1RzUJj7OeHPhE7IvZqJ1HyNO0sG.SQADNZAtZiaG', //password
    role: 'manager',
    organisationID: '2',
  },
})

//NHS site Data 
  await prisma.site.create({
      data: {
        name: 'Cardiff Royal Infirmary',
        organisation: organisation,
      },
  })

  await prisma.site.create({
      data: {
        name: 'University Hospital of Wales',
        organisation: organisation,
      },
  })
//NHS site 1 optimisations Data
  await prisma.optimisations.create({
      data: {
        organisationID: '2',
        //siteID: "3",
        priority: '3',
        title: 'Reduce number of computers',
        body: 'Reduces electricity consumption and cost',
        archived: false,
      },
  })
  
  await prisma.optimisations.create({
      data: {
        organisationID: '2',
        //siteID: "3",
        priority: '2',
        title: 'Reduce heating',
        body: 'Reduces electricity consumption and cost in the summer',
        archived: false,
      },
  })

  await prisma.optimisations.create({
      data: {
        organisationID: '2',
        //siteID: "3",
        priority: '1',
        title: 'Install solar panels',
        body: 'Generate own electricity',
        archived: false,
      },
  })

  await prisma.optimisations.create({
      data: {
        organisationID: '2',
        //siteID: "3",
        priority: '1',
        title: 'Turn off lights',
        body: 'Turn off lights to save cost',
        archived: false,
      },
  })
  //NHS site 2 optimisations Data 

  await prisma.optimisations.create({
    data: {
      organisationID: '2',
      //siteID: "4",
      priority: '2',
      title: 'Switch to electric heating',
      body: 'Reduces electricity consumption and cost',
      archived: false,
    },
})

await prisma.optimisations.create({
    data: {
      organisationID: '2',
      //siteID: "4",
      priority: '1',
      title: 'Install better insulation',
      body: 'Generate own electricity',
      archived: false,
    },
})

await prisma.optimisations.create({
    data: {
      organisationID: '2',
      //siteID: "4",
      priority: '1',
      title: 'Turn off lights',
      body: 'Turn off lights to save cost',
      archived: false,
    },
})
  //NHS site 1 Targets Data
  await prisma.targets.create({
    data: {
      title: 'weeklyCostTarget',
      name: 'cost',
      value: '40000',
      timeframe: 'weekly',
      //siteID: "1",
      organisationID: '2',
    },
})

await prisma.targets.create({
    data: {
      title: 'monthylCostTarget',
      name: 'cost',
      value: '80000',
      timeframe: 'monthly',
      //siteID: "1",
      organisationID: '2',
    },
})


await prisma.targets.create({
    data: {
      title: 'weelyEnergyTarget',
      name: 'energy',
      value: '90000',
      timeframe: 'weekly',
      //siteID: "1",
      organisationID: '2',
    },
})

await prisma.targets.create({
    data: {
      title: 'monthlyEnergyTarget',
      name: 'energy',
      value: '250000',
      timeframe: 'monthly',
      //siteID: "1",
      organisationID: '2',
    },
})

await prisma.targets.create({
    data: {
      title: 'weelyCarbonTarget',
      name: 'carbon',
      value: '50',
      timeframe: 'weekly',
      //siteID: "1",
      organisationID: '2',
    },
})

await prisma.targets.create({
    data: {
      title: 'monthlyCarbonTarget',
      name: 'carbon',
      value: '80',
      timeframe: 'monthly',
      //siteID: "1",
      organisationID: '2',
    },
})


// NHS targets data site 2

await prisma.targets.create({
  data: {
    title: 'weeklyCostTarget',
    name: 'cost',
    value: '12000',
    timeframe: 'weekly',
    //siteID: "2",
    organisationID: '2',
  },
})

await prisma.targets.create({
  data: {
    title: 'monthylCostTarget',
    name: 'cost',
    value: '70000',
    timeframe: 'monthly',
    //siteID: "2",
    organisationID: '2',
  },
})


await prisma.targets.create({
data: {
title: 'weelyEnergyTarget',
name: 'energy',
value: '120000',
timeframe: 'weekly',
//siteID: "2",
organisationID: '2',
},
})

await prisma.targets.create({
  data: {
    title: 'monthlyEnergyTarget',
    name: 'energy',
    value: '220000',
    timeframe: 'monthly',
    //siteID: "2",
    organisationID: '2',
  },
})

await prisma.targets.create({
  data: {
    title: 'weelyCarbonTarget',
    name: 'carbon',
    value: '35',
    timeframe: 'weekly',
    //siteID: "2",
    organisationID: '2',
  },
})

await prisma.targets.create({
  data: {
    title: 'monthlyCarbonTarget',
    name: 'carbon',
    value: '120',
    timeframe: 'monthly',
    //siteID: "2",
    organisationID: '2',
  },
})


  }
  main()
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
})
