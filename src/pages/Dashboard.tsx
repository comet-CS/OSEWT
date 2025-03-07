
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Code, BookOpen, Settings, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [downloadStarted, setDownloadStarted] = useState(false);

  const handleDownload = () => {
    setDownloadStarted(true);
    // Simulating download - in a real app, this would trigger an actual download
    setTimeout(() => {
      setDownloadStarted(false);
    }, 2000);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome, {user?.username}</h1>
            <p className="text-muted-foreground">
              Access your exploit tools and resources
            </p>
          </div>
          <Button 
            className="exploit-button mt-4 md:mt-0"
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
              <Card className="exploit-card">
                <CardHeader>
                  <CardTitle>Exploit Status</CardTitle>
                  <CardDescription>Current status of our exploit</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="font-medium">Online and Working</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Last updated: {new Date().toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>

              <Card className="exploit-card">
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

              <Card className="exploit-card">
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
              <CardHeader>
                <CardTitle>Popular Scripts</CardTitle>
                <CardDescription>
                  Ready-to-use scripts for popular games
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Adopt Me', 'Blox Fruits', 'Jailbreak', 'Phantom Forces', 'Arsenal'].map((game) => (
                    <div key={game} className="flex justify-between items-center p-3 bg-card/60 rounded-md hover:bg-card transition">
                      <span>{game}</span>
                      <Button size="sm" variant="outline" className="border-exploit-primary/30 hover:bg-exploit-primary/10">
                        <Code className="h-4 w-4 mr-1" />
                        View Scripts
                      </Button>
                    </div>
                  ))}
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
                    <div key={tutorial} className="flex justify-between items-center p-3 bg-card/60 rounded-md hover:bg-card transition">
                      <span>{tutorial}</span>
                      <Button size="sm" variant="outline" className="border-exploit-primary/30 hover:bg-exploit-primary/10">
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
                  <div className="flex justify-between items-center p-3 bg-card/60 rounded-md">
                    <span>Profile Information</span>
                    <Button size="sm" variant="outline" className="border-exploit-primary/30 hover:bg-exploit-primary/10">
                      <Settings className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-card/60 rounded-md">
                    <span>Change Password</span>
                    <Button size="sm" variant="outline" className="border-exploit-primary/30 hover:bg-exploit-primary/10">
                      <Settings className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-card/60 rounded-md">
                    <span>Notification Settings</span>
                    <Button size="sm" variant="outline" className="border-exploit-primary/30 hover:bg-exploit-primary/10">
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
