
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Download, Code, BookOpen, Settings, AlertCircle, Search, Star } from 'lucide-react';
import ScriptCard from '@/components/scripts/ScriptCard';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, scripts } = useAuth();
  const navigate = useNavigate();
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleDownload = () => {
    setDownloadStarted(true);
    // Simulating download - in a real app, this would trigger an actual download
    setTimeout(() => {
      setDownloadStarted(false);
    }, 2000);
  };

  const filteredScripts = scripts.filter(script => 
    script.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    script.game.toLowerCase().includes(searchQuery.toLowerCase()) ||
    script.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const favoriteScripts = scripts.filter(script => script.isFavorite);

  const viewScript = (scriptId: string) => {
    navigate(`/scripts/${scriptId}`);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome, {user?.username}</h1>
            <p className="text-muted-foreground">
              Access your exploit tools and resources
            </p>
          </div>
          <Button 
            className="exploit-button mt-4 md:mt-0 transition-all duration-300 hover:scale-[1.02]"
            onClick={handleDownload}
            disabled={downloadStarted}
          >
            <Download className="mr-2 h-4 w-4" />
            {downloadStarted ? 'Downloading...' : 'Download Exploit'}
          </Button>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-8">
          <TabsList className="grid grid-cols-4 max-w-xl">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="scripts">Scripts</TabsTrigger>
            <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="exploit-card hover-scale">
                <CardHeader>
                  <CardTitle>Exploit Status</CardTitle>
                  <CardDescription>Current status of our exploit</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-green-500 pulse"></div>
                    <span className="font-medium">Online and Working</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Last updated: {new Date().toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>

              <Card className="exploit-card hover-scale">
                <CardHeader>
                  <CardTitle>Account Level</CardTitle>
                  <CardDescription>Your current membership</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="text-lg font-bold text-exploit-accent">Premium Member</span>
                  <p className="text-sm text-muted-foreground mt-2">
                    Access to all scripts and features
                  </p>
                </CardContent>
              </Card>

              <Card className="exploit-card hover-scale">
                <CardHeader>
                  <CardTitle>Announcement</CardTitle>
                  <CardDescription>Latest news</CardDescription>
                </CardHeader>
                <CardContent className="flex items-start space-x-2">
                  <AlertCircle className="w-5 h-5 text-exploit-accent mt-0.5" />
                  <p className="text-sm">
                    New update coming soon with improved script compatibility and new features!
                  </p>
                </CardContent>
              </Card>
            </div>

            {favoriteScripts.length > 0 && (
              <Card className="exploit-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="h-5 w-5 mr-2 text-yellow-400 fill-yellow-400" />
                    Favorite Scripts
                  </CardTitle>
                  <CardDescription>
                    Your saved scripts for quick access
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {favoriteScripts.map(script => (
                      <ScriptCard key={script.id} script={script} compact />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="exploit-card">
              <CardHeader>
                <CardTitle>Getting Started</CardTitle>
                <CardDescription>
                  Follow these steps to start using your exploit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4 list-decimal list-inside">
                  <li className="text-muted-foreground">
                    <span className="text-foreground font-medium">Download the exploit</span>
                    <p className="pl-6 text-sm">
                      Click the download button above to get the latest version
                    </p>
                  </li>
                  <li className="text-muted-foreground">
                    <span className="text-foreground font-medium">Disable your antivirus</span>
                    <p className="pl-6 text-sm">
                      Temporarily disable your antivirus to avoid false positives
                    </p>
                  </li>
                  <li className="text-muted-foreground">
                    <span className="text-foreground font-medium">Run the application</span>
                    <p className="pl-6 text-sm">
                      Execute the application as administrator
                    </p>
                  </li>
                  <li className="text-muted-foreground">
                    <span className="text-foreground font-medium">Inject into Roblox</span>
                    <p className="pl-6 text-sm">
                      Click the inject button once Roblox is running
                    </p>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scripts" className="space-y-6">
            <Card className="exploit-card">
              <CardHeader className="pb-2">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div>
                    <CardTitle>Script Library</CardTitle>
                    <CardDescription>Browse and use ready-made scripts</CardDescription>
                  </div>
                  <div className="w-full md:w-64 mt-4 md:mt-0">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input 
                        placeholder="Search scripts..." 
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredScripts.length > 0 ? (
                    filteredScripts.map((script) => (
                      <ScriptCard key={script.id} script={script} />
                    ))
                  ) : (
                    <div className="col-span-full text-center py-8 text-muted-foreground">
                      No scripts found matching your search.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tutorials" className="space-y-6">
            <Card className="exploit-card">
              <CardHeader>
                <CardTitle>Learning Resources</CardTitle>
                <CardDescription>
                  Guides and tutorials to help you get the most out of your exploit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Beginner\'s Guide', 'Script Writing Basics', 'Advanced Techniques', 'Troubleshooting', 'Game-Specific Tips'].map((tutorial) => (
                    <div key={tutorial} className="flex justify-between items-center p-3 bg-card/60 rounded-md hover:bg-card transition-all duration-200 hover:translate-x-1">
                      <span>{tutorial}</span>
                      <Button size="sm" variant="outline" className="border-exploit-primary/30 hover:bg-exploit-primary/10 transition-colors duration-200">
                        <BookOpen className="h-4 w-4 mr-1" />
                        Read Tutorial
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="exploit-card">
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-card/60 rounded-md transition-all duration-200 hover:bg-card/80">
                    <span>Profile Information</span>
                    <Button size="sm" variant="outline" className="border-exploit-primary/30 hover:bg-exploit-primary/10 transition-colors duration-200">
                      <Settings className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-card/60 rounded-md transition-all duration-200 hover:bg-card/80">
                    <span>Change Password</span>
                    <Button size="sm" variant="outline" className="border-exploit-primary/30 hover:bg-exploit-primary/10 transition-colors duration-200">
                      <Settings className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-card/60 rounded-md transition-all duration-200 hover:bg-card/80">
                    <span>Notification Settings</span>
                    <Button size="sm" variant="outline" className="border-exploit-primary/30 hover:bg-exploit-primary/10 transition-colors duration-200">
                      <Settings className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Dashboard;
