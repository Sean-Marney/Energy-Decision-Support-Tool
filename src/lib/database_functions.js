import { prisma } from "./prisma";

// Function to read the optimisations for the organisation
export async function updateOptimisation(optimisationID) {
  // Reads number of optimisations in the database
  try {
    const optimisations = await prisma.optimisations.update({
      where: {
        id: optimisationID,
      },
      data: {
        archive: true,
      },
    });
    return optimisations;
  } catch (error) {
    console.debug(error);
    return error;
  }
}

  // Function to read the weekly and monthly targets for the organisation
export async function readTargets(organisationID){
      let targets, weekly = [0,0,0], monthly = [0,0,0], data = [];
      // Reads from the database
      try {
        targets = await prisma.target.findMany(  {   
          take: 6,
          where: {
            organisationID: organisationID,
          },  
          orderBy: [
            {
              name: 'asc',
            },
            {
              timeframe: 'desc',
            },
            ],
          });
      // Splits the target data up into weekly and monthly targets
      weekly = {"carbonTarget":targets[0].value, "costTarget":targets[2].value, "energyTarget":targets[4].value};
      monthly = {"carbonTarget":targets[1].value, "costTarget":targets[3].value, "energyTarget":targets[5].value};
      data[0] = weekly;
      data[1] = monthly;
      } catch (error) {
          console.log(error);
          data[0] = weekly;
          data[1] = monthly;
      };
      // Returns the data
      return data;
}

// Function to read the optimisations for the organisation
export async function readUnArchivedOptimisations(organisationID) {
  // Reads unarchived optimisations in the database
  let optimisations;
  try {
    optimisations = await prisma.optimisation.findMany({
      where: {
        organisationID: organisationID,
        archived: false,
      }
    })


  } catch (error) {
    console.log(error);
  }
  return optimisations;
}
// Function to read the sites for an organisation
export async function readSites(organisationName){
  // Reads unarchived optimisations in the database
  let sites;  
  try {
      sites = await prisma.site.findMany({
        where: {
          id: organisationName
        }, select: {
          name: true,
        },
      });
    } catch (error) {
        console.log(error);
    };
  return sites;
}
export async function readArchivedOptimisations(organisationID) {
  // Reads unarchived optimisations in the database
  let optimisations;
  try {
    optimisations = await prisma.optimisations.findMany({
      where: {
        organisationID: organisationID,
        archived: "0",
      },
      select: {
        id: true,
        title: true,
        priority: true,
      },
      orderBy: {
        priority: "asc",
      },
    });
  } catch (error) {
    console.log(error);
  }
  return optimisations;
}
