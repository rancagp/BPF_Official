import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { locale = 'id' } = req.query;
    
    // Check if translation file exists
    const filePath = path.join(process.cwd(), 'public', 'locales', locale as string, 'loco-london-gold.json');
    const fileExists = fs.existsSync(filePath);
    
    if (!fileExists) {
      return res.status(404).json({ 
        error: 'Translation file not found',
        path: filePath
      });
    }
    
    // Read the file directly
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const translations = JSON.parse(fileContent);
    
    res.status(200).json({
      success: true,
      locale,
      filePath,
      fileExists,
      translationKeys: Object.keys(translations),
      hasIntro: !!translations.intro,
      hasTitle: !!translations.title,
      sampleData: {
        title: translations.title,
        pageTitle: translations.pageTitle,
        intro: translations.intro
      }
    });
    
  } catch (error) {
    console.error('Debug error:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
