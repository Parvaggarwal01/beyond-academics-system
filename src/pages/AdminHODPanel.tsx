import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Filter,
  Download,
  Eye,
  FileText,
  Calendar,
  TrendingUp,
  AlertCircle,
  MessageSquare,
} from "lucide-react";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import { useHotkeys } from "@/hooks/useHotkeys";
import KeyboardShortcutsHelp from "@/components/KeyboardShortcutsHelp";

const AdminHODPanel = () => {
  const [selectedTab, setSelectedTab] = useState("pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedAchievement, setSelectedAchievement] = useState<any>(null);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<"approve" | "reject" | null>(null);
  const [reviewComments, setReviewComments] = useState("");
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Mock data - replace with actual API calls
  const submissions = [
    {
      id: "1",
      studentName: "Raj Patel",
      registrationNo: "12012345",
      title: "First Place in National Hackathon",
      category: "Technical",
      school: "Computer Science and Engineering",
      program: "B.Tech. (CSE) - AI and Machine Learning",
      submittedDate: "2026-01-28",
      status: "pending_review",
      certificateUrl: "#",
      level: "National",
      description: "Won first place in Smart India Hackathon 2026",
      avatar: "RP",
    },
    {
      id: "2",
      studentName: "Vikram Singh",
      registrationNo: "12012346",
      title: "Research Paper Published",
      category: "Technical",
      school: "Computer Science and Engineering",
      program: "B.Tech. (CSE) - Cloud Computing and Gen AI",
      submittedDate: "2026-01-27",
      status: "pending_review",
      certificateUrl: "#",
      level: "International",
      description: "Published paper in IEEE Conference on Cloud Computing",
      avatar: "VS",
    },
  ];

  const stats = {
    pending: 12,
    approved: 45,
    rejected: 3,
    avgApprovalTime: "2.3 days",
  };

  // Filter and sort logic
  const getFilteredSubmissions = () => {
    let filtered = submissions.filter(sub => {
      // Tab filter
      if (selectedTab === "pending" && sub.status !== "pending_review") return false;
      if (selectedTab === "approved" && sub.status !== "hod_approved") return false;
      if (selectedTab === "rejected" && sub.status !== "hod_rejected") return false;
      
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        sub.studentName.toLowerCase().includes(searchLower) ||
        sub.registrationNo.toLowerCase().includes(searchLower) ||
        sub.title.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
      
      // Category filter
      if (categoryFilter !== "all" && sub.category.toLowerCase() !== categoryFilter.toLowerCase()) {
        return false;
      }
      
      // Level filter
      if (levelFilter !== "all" && sub.level.toLowerCase() !== levelFilter.toLowerCase()) {
        return false;
      }
      
      return true;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date-desc":
          return new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime();
        case "date-asc":
          return new Date(a.submittedDate).getTime() - new Date(b.submittedDate).getTime();
        case "name-asc":
          return a.studentName.localeCompare(b.studentName);
        case "name-desc":
          return b.studentName.localeCompare(a.studentName);
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredSubmissions = getFilteredSubmissions();
  
  // Pagination
  const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage);
  const paginatedSubmissions = filteredSubmissions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleClearFilters = () => {
    setSearchQuery("");
    setCategoryFilter("all");
    setLevelFilter("all");
    setSortBy("date-desc");
    setCurrentPage(1);
  };

  const handleExportCSV = () => {
    const csvHeaders = [
      "Student Name",
      "Registration No",
      "Title",
      "Category",
      "Level",
      "Submitted Date",
      "Status",
      "Program",
    ];

    const csvRows = filteredSubmissions.map(sub => [
      sub.studentName,
      sub.registrationNo,
      sub.title,
      sub.category,
      sub.level,
      sub.submittedDate,
      sub.status,
      sub.program,
    ]);

    const csvContent = [
      csvHeaders.join(","),
      ...csvRows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `hod_submissions_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Export Successful",
      description: `Exported ${filteredSubmissions.length} submissions to CSV.`,
    });
  };

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { label: string; variant: any }> = {
      pending_review: { label: "Pending Review", variant: "default" },
      hod_approved: { label: "Approved", variant: "default" },
      hod_rejected: { label: "Rejected", variant: "destructive" },
    };
    return badges[status] || { label: status, variant: "secondary" };
  };

  const handleApprove = () => {
    if (!reviewComments.trim()) {
      toast({
        title: "⚠️ Comments Required",
        description: (
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>Please add comments before approving.</span>
          </div>
        ),
        variant: "destructive",
      });
      return;
    }

    setConfirmAction("approve");
    setIsConfirmDialogOpen(true);
  };

  const handleReject = () => {
    if (!reviewComments.trim()) {
      toast({
        title: "⚠️ Comments Required",
        description: (
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>Please provide a reason for rejection.</span>
          </div>
        ),
        variant: "destructive",
      });
      return;
    }

    setConfirmAction("reject");
    setIsConfirmDialogOpen(true);
  };

  const confirmApproveReject = () => {
    if (confirmAction === "approve") {
      toast({
        title: "✅ Achievement Approved",
        description: (
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Forwarded to HOS for next level approval.</span>
          </div>
        ),
      });
    } else if (confirmAction === "reject") {
      toast({
        title: "❌ Achievement Rejected",
        description: (
          <div className="flex items-center gap-2">
            <XCircle className="w-4 h-4 text-red-500" />
            <span>Student has been notified.</span>
          </div>
        ),
        variant: "destructive",
      });
    }

    setIsConfirmDialogOpen(false);
    setIsReviewDialogOpen(false);
    setReviewComments("");
    setConfirmAction(null);
  };

  const openReviewDialog = (achievement: any) => {
    setSelectedAchievement(achievement);
    setIsReviewDialogOpen(true);
  };

  // Keyboard shortcuts
  useHotkeys([
    {
      key: 's',
      ctrl: true,
      callback: (e) => {
        e.preventDefault();
        searchInputRef.current?.focus();
      },
      description: 'Focus search',
    },
    {
      key: '?',
      callback: () => {
        setIsHelpOpen(true);
      },
      description: 'Show keyboard shortcuts',
    },
    {
      key: '1',
      ctrl: true,
      callback: () => {
        setSelectedTab('pending');
      },
      description: 'Switch to pending tab',
    },
    {
      key: '2',
      ctrl: true,
      callback: () => {
        setSelectedTab('approved');
      },
      description: 'Switch to approved tab',
    },
    {
      key: '3',
      ctrl: true,
      callback: () => {
        setSelectedTab('rejected');
      },
      description: 'Switch to rejected tab',
    },
    {
      key: 'e',
      ctrl: true,
      callback: (e) => {
        e.preventDefault();
        handleExportCSV();
      },
      description: 'Export to CSV',
    },
    {
      key: 'Escape',
      callback: () => {
        if (isHelpOpen) setIsHelpOpen(false);
        if (isReviewDialogOpen) setIsReviewDialogOpen(false);
        if (isConfirmDialogOpen) setIsConfirmDialogOpen(false);
      },
      description: 'Close dialogs',
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />

      <main id="main-content" className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold">HOD Dashboard</h1>
              <p className="text-muted-foreground">
                Computer Science and Engineering Department
              </p>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  onClick={handleExportCSV}
                  aria-label="Export filtered submissions to CSV file"
                >
                  <Download className="w-4 h-4 mr-2" aria-hidden="true" />
                  Export Report
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Export to CSV <kbd className="ml-1 px-1.5 py-0.5 text-xs bg-muted rounded">Ctrl+E</kbd></p>
              </TooltipContent>
            </Tooltip>
          </div>
        </header>

        {/* Stats Cards */}
        <section aria-label="Statistics overview" className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold">{stats.pending}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-500" aria-hidden="true" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Approved</p>
                  <p className="text-2xl font-bold">{stats.approved}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" aria-hidden="true" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Rejected</p>
                  <p className="text-2xl font-bold">{stats.rejected}</p>
                </div>
                <XCircle className="w-8 h-8 text-red-500" aria-hidden="true" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Time</p>
                  <p className="text-2xl font-bold">{stats.avgApprovalTime}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-500" aria-hidden="true" />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>Achievement Submissions</CardTitle>
                <CardDescription>
                  Review and approve student achievements
                </CardDescription>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                      <Input
                        ref={searchInputRef}
                        placeholder="Search by name, title..."
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="pl-10 w-64"
                        aria-label="Search submissions by student name or achievement title"
                        role="searchbox"
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Focus search <kbd className="ml-1 px-1.5 py-0.5 text-xs bg-muted rounded">Ctrl+S</kbd></p>
                  </TooltipContent>
                </Tooltip>
                
                <Select value={categoryFilter} onValueChange={(value) => {
                  setCategoryFilter(value);
                  setCurrentPage(1);
                }}>
                  <SelectTrigger className="w-40" aria-label="Filter by achievement category">
                    <Filter className="w-4 h-4 mr-2" aria-hidden="true" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="cultural">Cultural</SelectItem>
                    <SelectItem value="arts_culture">Arts & Culture</SelectItem>
                    <SelectItem value="startup">Startup & Innovation</SelectItem>
                    <SelectItem value="community">Community Service</SelectItem>
                    <SelectItem value="club">Club & Organization</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={levelFilter} onValueChange={(value) => {
                  setLevelFilter(value);
                  setCurrentPage(1);
                }}>
                  <SelectTrigger className="w-40" aria-label="Filter by competition level">
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="college">College</SelectItem>
                    <SelectItem value="university">University</SelectItem>
                    <SelectItem value="state">State</SelectItem>
                    <SelectItem value="national">National</SelectItem>
                    <SelectItem value="international">International</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40" aria-label="Sort submissions by date or name">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date-desc">Newest First</SelectItem>
                    <SelectItem value="date-asc">Oldest First</SelectItem>
                    <SelectItem value="name-asc">Name A-Z</SelectItem>
                    <SelectItem value="name-desc">Name Z-A</SelectItem>
                  </SelectContent>
                </Select>

                {(searchQuery || categoryFilter !== "all" || levelFilter !== "all") && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleClearFilters}
                    aria-label="Clear all active filters"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="mb-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <TabsTrigger value="pending">
                      Pending ({stats.pending})
                    </TabsTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Show pending <kbd className="ml-1 px-1.5 py-0.5 text-xs bg-muted rounded">Ctrl+1</kbd></p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <TabsTrigger value="approved">
                      Approved ({stats.approved})
                    </TabsTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Show approved <kbd className="ml-1 px-1.5 py-0.5 text-xs bg-muted rounded">Ctrl+2</kbd></p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <TabsTrigger value="rejected">
                      Rejected ({stats.rejected})
                    </TabsTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Show rejected <kbd className="ml-1 px-1.5 py-0.5 text-xs bg-muted rounded">Ctrl+3</kbd></p>
                  </TooltipContent>
                </Tooltip>
              </TabsList>

              <TabsContent value="pending" className="space-y-4">
                <div className="mb-4 text-sm text-muted-foreground">
                  Showing {paginatedSubmissions.length} of {filteredSubmissions.length} results
                </div>
                {paginatedSubmissions.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    No submissions found matching your filters.
                  </div>
                ) : (
                  paginatedSubmissions.map((submission) => (
                  <Card key={submission.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${submission.studentName}`} />
                          <AvatarFallback>{submission.avatar}</AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-lg">
                                {submission.title}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {submission.studentName} • {submission.registrationNo}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {submission.program}
                              </p>
                            </div>
                            <Badge variant="secondary">{submission.category}</Badge>
                          </div>

                          <p className="text-sm text-muted-foreground mb-3">
                            {submission.description}
                          </p>

                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {submission.submittedDate}
                            </span>
                            <span className="flex items-center gap-1">
                              <AlertCircle className="w-4 h-4" />
                              {submission.level} Level
                            </span>
                          </div>

                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => window.open(submission.certificateUrl)}
                              aria-label={`View certificate for ${submission.title}`}
                            >
                              <Eye className="w-4 h-4 mr-2" aria-hidden="true" />
                              View Certificate
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => openReviewDialog(submission)}
                              aria-label={`Review and approve ${submission.title} by ${submission.studentName}`}
                            >
                              <FileText className="w-4 h-4 mr-2" aria-hidden="true" />
                              Review & Approve
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  ))
                )}

                {/* Pagination */}
                {filteredSubmissions.length > 0 && (
                  <div className="flex items-center justify-between mt-6 pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Items per page:</span>
                      <Select
                        value={itemsPerPage.toString()}
                        onValueChange={(value) => {
                          setItemsPerPage(Number(value));
                          setCurrentPage(1);
                        }}
                      >
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="25">25</SelectItem>
                          <SelectItem value="50">50</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center gap-2" role="navigation" aria-label="Pagination">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        aria-label="Go to previous page"
                      >
                        Previous
                      </Button>
                      <span className="text-sm text-muted-foreground" aria-current="page" aria-live="polite">
                        Page {currentPage} of {totalPages}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        aria-label="Go to next page"
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="approved">
                <p className="text-center text-muted-foreground py-8">
                  No approved submissions yet
                </p>
              </TabsContent>

              <TabsContent value="rejected">
                <p className="text-center text-muted-foreground py-8">
                  No rejected submissions yet
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        

      {/* Review Dialog */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review Achievement</DialogTitle>
            <DialogDescription>
              {selectedAchievement?.title}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Student</p>
                <p className="font-medium">{selectedAchievement?.studentName}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Category</p>
                <p className="font-medium">{selectedAchievement?.category}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Level</p>
                <p className="font-medium">{selectedAchievement?.level}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Date</p>
                <p className="font-medium">{selectedAchievement?.submittedDate}</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Description</p>
              <p className="text-sm text-muted-foreground">
                {selectedAchievement?.description}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                HOD Comments *
              </label>
              <Textarea
                placeholder="Add your verification comments, observations, and recommendations..."
                value={reviewComments}
                onChange={(e) => setReviewComments(e.target.value)}
                rows={4}
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsReviewDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleReject}>
              <XCircle className="w-4 h-4 mr-2" />
              Reject
            </Button>
            <Button onClick={handleApprove}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Approve & Forward to HOS
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <AlertDialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {confirmAction === "approve" ? "Approve Achievement?" : "Reject Achievement?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirmAction === "approve"
                ? "This will forward the achievement to HOS for next level approval. The student will be notified."
                : "This will reject the achievement and notify the student. They may resubmit with corrections."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmApproveReject}
              className={confirmAction === "reject" ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : ""}
            >
              {confirmAction === "approve" ? "Approve" : "Reject"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Keyboard Shortcuts Help */}
      <KeyboardShortcutsHelp open={isHelpOpen} onOpenChange={setIsHelpOpen} />
      </main>
    </div>
  );
};

export default AdminHODPanel;
