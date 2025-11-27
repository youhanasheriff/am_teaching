import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/lib/sanity/schemas/index';


export default defineConfig({
    name: 'default',
    title: 'AM Teachings',

    projectId: 'l25w16t4',
    dataset: 'production',

    plugins: [structureTool(), visionTool()],

    schema: {
        types: schemaTypes,
    },
});
