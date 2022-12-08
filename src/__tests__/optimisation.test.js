import { prisma } from "../lib/prisma";
import { Prisma } from "@prisma/client";
import { readArchivedOptimisations, readUnArchivedOptimisations }  from '../lib/database_functions';
import { Optimisation } from "../components/Optimisation";
import { ArchivedOptimisation } from "../components/ArchivedOptimisation";
import { ArchivedList } from "../components/ArchivedList";
import Optimisations from "../pages/optimisations";
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'


test('Reading Optimisations', async () => {
    let optimisations = await readUnArchivedOptimisations("Cardiff University");
    expect(optimisations.length).toEqual(1);
})
test('Unarchived Optimisations', async () => {
    let optimisations = await readArchivedOptimisations("Cardiff University");
    expect(optimisations.length).toEqual(7);
})
test('Optimisation', () => {
    render(<Optimisation key={'optimisation 1'} optimisation = {{"id": 1,"organisation": 'Cardiff University',"priority": '3',"title": 'Reduce number of computers',"body": 'Reduces electricity consumption and cost',"archived": false}}/>);
    const optimisation = screen.getByText("Reduce number of computers");
    const body = screen.getByText('Reduces electricity consumption and cost');
    expect(optimisation).toBeInTheDocument();
    expect(body).toBeInTheDocument();
})
test('Archived Optimisation', () => {
    render(<ArchivedOptimisation key={'optimisation 1'} optimisation = {{"id": 1,"organisation": 'Cardiff University',"priority": '3',"title": 'Reduce number of computers',"body": 'Reduces electricity consumption and cost',"archived": true}}/>);
    const title = screen.getByText("Reduce number of computers");
    const photo = screen.getByAltText("Tip");
    expect(title).toBeInTheDocument();
    expect(photo).toBeInTheDocument();
})
test('Archived Optimisation List',() => {
    render(<ArchivedList list={[]}/>)
    const title = screen.getByText("Archived Items");
    expect(title).toBeInTheDocument();        
})
test('Working All Together',() => { 
    render(<Optimisations data={[[{"id": 1,"organisation": 'Cardiff University',"priority": '3',"title": 'Reduce number of computers',"body": 'Reduces electricity consumption and cost',"archived": false}],[{ "id": 3, "title": 'Install solar panels', "priority": '1' },{ "id": 4, "title": 'Turn off lights', "priority": '1' }]]}/>);    
    const optimisation1 = screen.getByText("Reduce number of computers");
    const optimisation2 = screen.getByText("Install solar panels");
    expect(optimisation1).toBeInTheDocument();
    expect(optimisation2).toBeInTheDocument();    
})