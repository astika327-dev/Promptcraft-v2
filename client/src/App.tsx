import { useState } from 'react';
import { generatePrompt, TargetModel } from './lib/api';
import { promptTemplates } from './lib/templates';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Toaster, toast } from "sonner";


function App() {
  const [context, setContext] = useState('');
  const [targetModel, setTargetModel] = useState<TargetModel>('GPT-4');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!context) {
      setError('Context cannot be empty.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedPrompt('');
    try {
      const prompt = await generatePrompt({ context, target_model: targetModel });
      setGeneratedPrompt(prompt);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
	  toast.error(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
    toast.success("Copied to clipboard!");
  };

  const handleTemplateClick = (templateContext: string) => {
    setContext(templateContext);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-8">
      <Toaster />
      <header className="text-center mb-10">
        <h1 className="text-5xl font-bold">PromptCraft</h1>
        <p className="text-muted-foreground mt-2">Generate Production-Ready Prompts for Any AI Model</p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* Left: Input and Controls */}
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>1. Provide Context</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                rows={8}
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="e.g., 'Create a logo for a coffee shop with a cyberpunk theme'"
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>2. Select Target Model</CardTitle>
            </CardHeader>
            <CardContent>
              <Select onValueChange={(value) => setTargetModel(value as TargetModel)} defaultValue={targetModel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GPT-4">GPT-4</SelectItem>
                  <SelectItem value="Claude 3.5">Claude 3.5</SelectItem>
                  <SelectItem value="Llama 3">Llama 3</SelectItem>
                  <SelectItem value="Gemini">Gemini</SelectItem>
                  <SelectItem value="Stable Diffusion">Stable Diffusion</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
          <Button onClick={handleGenerate} disabled={isLoading} className="w-full">
            {isLoading ? 'Generating...' : 'Generate Prompt'}
          </Button>
          {error && <p className="text-destructive mt-2">{error}</p>}
        </div>

        {/* Right: Output */}
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>3. Generated Prompt</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-md h-96 overflow-y-auto whitespace-pre-wrap">
                {generatedPrompt || <span className="text-muted-foreground">Your generated prompt will appear here...</span>}
              </div>
              {generatedPrompt && (
                <Button onClick={handleCopyToClipboard} className="mt-4">
                  Copy to Clipboard
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <section className="max-w-7xl mx-auto mt-12">
        <h2 className="text-3xl font-bold text-center mb-6">Template Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {promptTemplates.map(template => (
            <Card
              key={template.id}
              className="cursor-pointer hover:bg-accent transition-colors"
              onClick={() => handleTemplateClick(template.context)}
            >
              <CardHeader>
                <CardTitle>{template.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">{template.context}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
