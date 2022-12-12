const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
async function main() {
   
    await prisma.site.create({
        data: {
          name: 'Abacws',
          organisation: 'Cardiff University',
        },
    })

    await prisma.site.create({
        data: {
          name: 'Students Union',
          organisation: 'Cardiff University',
        },
    })

    await prisma.optimisations.create({
        data: {
          organisation: 'Cardiff University',
          priority: '3',
          title: 'Reduce number of computers',
          body: 'Reduces electricity consumption and cost',
          archived: false,
        },
    })
    
    await prisma.optimisations.create({
        data: {
          organisation: 'Cardiff University',
          priority: '2',
          title: 'Reduce heating',
          body: 'Reduces electricity consumption and cost in the summer',
          archived: false,
        },
    })

    await prisma.optimisations.create({
        data: {
          organisation: 'Cardiff University',
          priority: '1',
          title: 'Install solar panels',
          body: 'Generate own electricity',
          archived: false,
        },
    })

    await prisma.optimisations.create({
        data: {
          organisation: 'Cardiff University',
          priority: '1',
          title: 'Turn off lights',
          body: 'Turn off lights to save cost',
          archived: false,
        },
    })

    await prisma.targets.create({
        data: {
          organisation: 'Cardiff University',
          name: 'cost',
          value: '10000',
          timeframe: 'weekly',
        },
    })

    await prisma.targets.create({
        data: {
          organisation: 'Cardiff University',
          name: 'cost',
          value: '40000',
          timeframe: 'monthly',
        },
    })

    
    await prisma.targets.create({
        data: {
          organisation: 'Cardiff University',
          name: 'energy',
          value: '60000',
          timeframe: 'weekly',
        },
    })

    await prisma.targets.create({
        data: {
          organisation: 'Cardiff University',
          name: 'energy',
          value: '150000',
          timeframe: 'monthly',
        },
    })

    await prisma.targets.create({
        data: {
          organisation: 'Cardiff University',
          name: 'carbon',
          value: '20',
          timeframe: 'weekly',
        },
    })

    await prisma.targets.create({
        data: {
          organisation: 'Cardiff University',
          name: 'carbon',
          value: '30',
          timeframe: 'monthly',
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