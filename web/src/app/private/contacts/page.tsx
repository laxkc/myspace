"use client";
import React, { useState, useMemo } from "react";
import {
  FiSearch,
  FiFilter,
  FiMail,
  FiUser,
  FiCalendar,
  FiEye,
  FiTrash2,
  FiCheck,
  FiX,
  FiClock,
  FiStar,
} from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";

// Force dynamic rendering to avoid SSR issues
export const dynamic = 'force-dynamic';

// Contact message interface
interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "unread" | "read" | "replied" | "archived";
  priority: "low" | "medium" | "high";
  createdAt: string;
  readAt?: string;
  repliedAt?: string;
}

// Mock data for contacts
const mockContacts: ContactMessage[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    subject: "Website Development Inquiry",
    message:
      "Hi, I'm interested in having a website developed for my business. Could you provide more information about your services and pricing?",
    status: "unread",
    priority: "high",
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@techstartup.com",
    subject: "Mobile App Development",
    message:
      "We're looking for a developer to help us build a mobile app for our startup. Are you available for freelance work?",
    status: "read",
    priority: "medium",
    createdAt: "2024-01-14T15:45:00Z",
    readAt: "2024-01-15T09:20:00Z",
  },
  {
    id: "3",
    name: "Mike Chen",
    email: "mike.chen@consulting.com",
    subject: "Consultation Request",
    message:
      "I'd like to schedule a consultation to discuss a project I'm working on. What's your availability like?",
    status: "replied",
    priority: "low",
    createdAt: "2024-01-13T11:15:00Z",
    readAt: "2024-01-13T14:30:00Z",
    repliedAt: "2024-01-14T10:00:00Z",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@designstudio.com",
    subject: "Collaboration Opportunity",
    message:
      "I run a design studio and we're looking for a developer to collaborate with on client projects. Would you be interested?",
    status: "archived",
    priority: "medium",
    createdAt: "2024-01-12T16:20:00Z",
    readAt: "2024-01-12T18:45:00Z",
  },
  {
    id: "5",
    name: "David Wilson",
    email: "david.wilson@enterprise.com",
    subject: "Enterprise Project",
    message:
      "We have a large enterprise project that requires a skilled developer. Can you provide your portfolio and experience details?",
    status: "unread",
    priority: "high",
    createdAt: "2024-01-15T08:15:00Z",
  },
  {
    id: "6",
    name: "Lisa Brown",
    email: "lisa.brown@startup.com",
    subject: "Technical Consultation",
    message:
      "I need some technical advice for my startup. Could you help me understand the best technology stack for our needs?",
    status: "read",
    priority: "medium",
    createdAt: "2024-01-14T13:30:00Z",
    readAt: "2024-01-15T07:45:00Z",
  },
  {
    id: "7",
    name: "Alex Thompson",
    email: "alex.t@freelance.com",
    subject: "Freelance Partnership",
    message:
      "I'm a freelance designer looking for a developer to partner with on projects. Are you open to partnerships?",
    status: "unread",
    priority: "low",
    createdAt: "2024-01-15T12:00:00Z",
  },
  {
    id: "8",
    name: "Rachel Green",
    email: "rachel.green@agency.com",
    subject: "Agency Project",
    message:
      "Our agency is looking for a reliable developer for ongoing projects. What's your availability and rates?",
    status: "replied",
    priority: "high",
    createdAt: "2024-01-13T09:45:00Z",
    readAt: "2024-01-13T11:20:00Z",
    repliedAt: "2024-01-14T16:30:00Z",
  },
  {
    id: "9",
    name: "Tom Anderson",
    email: "tom.anderson@ecommerce.com",
    subject: "E-commerce Platform Development",
    message:
      "I need a developer to build a custom e-commerce platform for my online store. Can you help with the full development process?",
    status: "unread",
    priority: "high",
    createdAt: "2024-01-15T14:20:00Z",
  },
  {
    id: "10",
    name: "Maria Garcia",
    email: "maria.garcia@restaurant.com",
    subject: "Restaurant Website & App",
    message:
      "I own a restaurant and need both a website and mobile app for online ordering. What would be the timeline and cost?",
    status: "read",
    priority: "medium",
    createdAt: "2024-01-15T11:30:00Z",
    readAt: "2024-01-15T13:45:00Z",
  },
  {
    id: "11",
    name: "James Wilson",
    email: "james.wilson@realestate.com",
    subject: "Real Estate Platform",
    message:
      "Looking for a developer to create a real estate listing platform with advanced search and filtering capabilities.",
    status: "unread",
    priority: "medium",
    createdAt: "2024-01-15T09:15:00Z",
  },
  {
    id: "12",
    name: "Sophie Chen",
    email: "sophie.chen@healthtech.com",
    subject: "Healthcare App Development",
    message:
      "We're developing a healthcare app and need a skilled developer to join our team. Are you interested in healthcare technology?",
    status: "replied",
    priority: "high",
    createdAt: "2024-01-14T16:45:00Z",
    readAt: "2024-01-14T18:20:00Z",
    repliedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "13",
    name: "Robert Taylor",
    email: "robert.taylor@fintech.com",
    subject: "Financial Dashboard",
    message:
      "Need a developer to build a financial dashboard with real-time data visualization and reporting features.",
    status: "read",
    priority: "low",
    createdAt: "2024-01-14T13:10:00Z",
    readAt: "2024-01-15T08:30:00Z",
  },
  {
    id: "14",
    name: "Emma Davis",
    email: "emma.davis@education.com",
    subject: "Learning Management System",
    message:
      "I'm looking to develop a learning management system for online courses. Can you provide guidance on the best approach?",
    status: "unread",
    priority: "medium",
    createdAt: "2024-01-15T07:45:00Z",
  },
  {
    id: "15",
    name: "Michael Brown",
    email: "michael.brown@logistics.com",
    subject: "Logistics Tracking System",
    message:
      "We need a logistics tracking system for our delivery company. What technologies would you recommend for real-time tracking?",
    status: "archived",
    priority: "high",
    createdAt: "2024-01-12T10:30:00Z",
    readAt: "2024-01-12T14:15:00Z",
  },
  {
    id: "16",
    name: "Lisa Johnson",
    email: "lisa.johnson@marketing.com",
    subject: "Marketing Analytics Platform",
    message:
      "Looking for a developer to build a marketing analytics platform that integrates with various social media APIs.",
    status: "replied",
    priority: "medium",
    createdAt: "2024-01-13T15:20:00Z",
    readAt: "2024-01-13T17:45:00Z",
    repliedAt: "2024-01-14T11:20:00Z",
  },
  {
    id: "17",
    name: "David Lee",
    email: "david.lee@startup.com",
    subject: "MVP Development",
    message:
      "I have a startup idea and need help building an MVP. Can you work with early-stage companies and provide flexible payment terms?",
    status: "unread",
    priority: "low",
    createdAt: "2024-01-15T12:30:00Z",
  },
  {
    id: "18",
    name: "Sarah Miller",
    email: "sarah.miller@consulting.com",
    subject: "Client Portal Development",
    message:
      "Need a secure client portal for our consulting business. It should include file sharing, messaging, and project tracking.",
    status: "read",
    priority: "high",
    createdAt: "2024-01-14T09:45:00Z",
    readAt: "2024-01-15T06:20:00Z",
  },
];

export default function ContactsPage() {
  const [contacts, setContacts] = useState<ContactMessage[]>(mockContacts);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [contactToDelete, setContactToDelete] = useState<string | null>(null);
  const [selectedContact, setSelectedContact] = useState<ContactMessage | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filter and search contacts
  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) => {
      const matchesSearch =
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.subject.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || contact.status === statusFilter;
      const matchesPriority =
        priorityFilter === "all" || contact.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [contacts, searchTerm, statusFilter, priorityFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedContacts = filteredContacts.slice(startIndex, endIndex);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, priorityFilter]);

  // Handle contact selection
  const handleSelectContact = (contactId: string) => {
    setSelectedContacts((prev) =>
      prev.includes(contactId)
        ? prev.filter((id) => id !== contactId)
        : [...prev, contactId]
    );
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedContacts.length === paginatedContacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(paginatedContacts.map((contact) => contact.id));
    }
  };

  // Mark as read
  const markAsRead = (contactId: string) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === contactId
          ? {
              ...contact,
              status: "read" as const,
              readAt: new Date().toISOString(),
            }
          : contact
      )
    );
    toast.success("Marked as read");
  };

  // Mark as replied
  const markAsReplied = (contactId: string) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === contactId
          ? {
              ...contact,
              status: "replied" as const,
              repliedAt: new Date().toISOString(),
            }
          : contact
      )
    );
    toast.success("Marked as replied");
  };

  // Archive contact
  const archiveContact = (contactId: string) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === contactId
          ? { ...contact, status: "archived" as const }
          : contact
      )
    );
    toast.success("Contact archived");
  };

  // Delete contact
  const deleteContact = (contactId: string) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== contactId));
    setSelectedContacts((prev) => prev.filter((id) => id !== contactId));
    setShowDeleteModal(false);
    setContactToDelete(null);
    toast.success("Contact deleted");
  };

  // Bulk actions
  const handleBulkAction = (action: string) => {
    if (selectedContacts.length === 0) {
      toast.error("Please select contacts first");
      return;
    }

    switch (action) {
      case "mark-read":
        setContacts((prev) =>
          prev.map((contact) =>
            selectedContacts.includes(contact.id)
              ? {
                  ...contact,
                  status: "read" as const,
                  readAt: new Date().toISOString(),
                }
              : contact
          )
        );
        toast.success(`${selectedContacts.length} contacts marked as read`);
        break;
      case "mark-replied":
        setContacts((prev) =>
          prev.map((contact) =>
            selectedContacts.includes(contact.id)
              ? {
                  ...contact,
                  status: "replied" as const,
                  repliedAt: new Date().toISOString(),
                }
              : contact
          )
        );
        toast.success(`${selectedContacts.length} contacts marked as replied`);
        break;
      case "archive":
        setContacts((prev) =>
          prev.map((contact) =>
            selectedContacts.includes(contact.id)
              ? { ...contact, status: "archived" as const }
              : contact
          )
        );
        toast.success(`${selectedContacts.length} contacts archived`);
        break;
      case "delete":
        setContactToDelete("bulk");
        setShowDeleteModal(true);
        break;
    }
    setSelectedContacts([]);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      unread: { color: "bg-red-100 text-red-800", icon: FiClock },
      read: { color: "bg-blue-100 text-blue-800", icon: FiEye },
      replied: { color: "bg-green-100 text-green-800", icon: FiCheck },
      archived: { color: "bg-gray-100 text-gray-800", icon: FiX },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;

    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
      >
        <Icon className="w-3 h-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Get priority badge
  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      low: { color: "bg-gray-100 text-gray-800", icon: FiStar },
      medium: { color: "bg-yellow-100 text-yellow-800", icon: FiStar },
      high: { color: "bg-red-100 text-red-800", icon: FiStar },
    };

    const config = priorityConfig[priority as keyof typeof priorityConfig];
    const Icon = config.icon;

    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
      >
        <Icon className="w-3 h-3" />
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  // Pagination component
  const Pagination = () => {
    const getPageNumbers = () => {
      const pages = [];
      const maxVisiblePages = 5;

      if (totalPages <= maxVisiblePages) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        if (currentPage <= 3) {
          for (let i = 1; i <= 4; i++) {
            pages.push(i);
          }
          pages.push("...");
          pages.push(totalPages);
        } else if (currentPage >= totalPages - 2) {
          pages.push(1);
          pages.push("...");
          for (let i = totalPages - 3; i <= totalPages; i++) {
            pages.push(i);
          }
        } else {
          pages.push(1);
          pages.push("...");
          for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            pages.push(i);
          }
          pages.push("...");
          pages.push(totalPages);
        }
      }

      return pages;
    };

    if (totalPages <= 1) return null;

    return (
      <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-white">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Show:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span className="text-sm text-gray-700">per page</span>
          </div>

          <div className="text-sm text-gray-700">
            Showing {startIndex + 1} to{" "}
            {Math.min(endIndex, filteredContacts.length)} of{" "}
            {filteredContacts.length} results
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>

          <div className="flex items-center gap-1">
            {getPageNumbers().map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === "number" && setCurrentPage(page)}
                disabled={page === "..."}
                className={`px-3 py-1 text-sm border rounded transition-colors ${
                  page === currentPage
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : page === "..."
                    ? "border-gray-300 text-gray-400 cursor-default"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
            <FiMail className="w-5 h-5 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Contact Messages</h1>
        </div>
        <p className="text-gray-600">
          Manage and respond to contact form submissions from your website.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Messages
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {contacts.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FiMail className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Unread</p>
              <p className="text-2xl font-bold text-red-600">
                {contacts.filter((c) => c.status === "unread").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <FiClock className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Replied</p>
              <p className="text-2xl font-bold text-green-600">
                {contacts.filter((c) => c.status === "replied").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FiCheck className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Archived</p>
              <p className="text-2xl font-bold text-gray-600">
                {contacts.filter((c) => c.status === "archived").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <FiX className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, email, or subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
            >
              <option value="all">All Status</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
              <option value="archived">Archived</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
            >
              <option value="all">All Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedContacts.length > 0 && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-indigo-800">
              {selectedContacts.length} contact(s) selected
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => handleBulkAction("mark-read")}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
              >
                Mark as Read
              </button>
              <button
                onClick={() => handleBulkAction("mark-replied")}
                className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
              >
                Mark as Replied
              </button>
              <button
                onClick={() => handleBulkAction("archive")}
                className="px-3 py-1 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 transition-colors"
              >
                Archive
              </button>
              <button
                onClick={() => handleBulkAction("delete")}
                className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contacts Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={
                      selectedContacts.length === paginatedContacts.length &&
                      paginatedContacts.length > 0
                    }
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedContacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedContacts.includes(contact.id)}
                      onChange={() => handleSelectContact(contact.id)}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {contact.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {contact.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">
                      {contact.subject}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(contact.status)}
                  </td>
                  <td className="px-6 py-4">
                    {getPriorityBadge(contact.priority)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {formatDate(contact.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedContact(contact)}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                        title="View Details"
                      >
                        <FiEye className="w-4 h-4" />
                      </button>
                      {contact.status === "unread" && (
                        <button
                          onClick={() => markAsRead(contact.id)}
                          className="p-1 text-blue-400 hover:text-blue-600 transition-colors"
                          title="Mark as Read"
                        >
                          <FiEye className="w-4 h-4" />
                        </button>
                      )}
                      {contact.status !== "replied" && (
                        <button
                          onClick={() => markAsReplied(contact.id)}
                          className="p-1 text-green-400 hover:text-green-600 transition-colors"
                          title="Mark as Replied"
                        >
                          <FiCheck className="w-4 h-4" />
                        </button>
                      )}
                      {contact.status !== "archived" && (
                        <button
                          onClick={() => archiveContact(contact.id)}
                          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                          title="Archive"
                        >
                          <FiX className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setContactToDelete(contact.id);
                          setShowDeleteModal(true);
                        }}
                        className="p-1 text-red-400 hover:text-red-600 transition-colors"
                        title="Delete"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {paginatedContacts.length === 0 && (
          <div className="text-center py-12">
            <FiMail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No contact messages found</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <Pagination />

      {/* Contact Detail Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  Contact Details
                </h2>
                <button
                  onClick={() => setSelectedContact(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <p className="text-gray-900">{selectedContact.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <p className="text-gray-900">{selectedContact.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <p className="text-gray-900">{selectedContact.subject}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <div className="mt-1">
                    {getStatusBadge(selectedContact.status)}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <div className="mt-1">
                    {getPriorityBadge(selectedContact.priority)}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <p className="text-gray-900">
                    {formatDate(selectedContact.createdAt)}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <div className="bg-gray-50 rounded-lg p-4 text-gray-900 whitespace-pre-wrap">
                  {selectedContact.message}
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                {selectedContact.status === "unread" && (
                  <button
                    onClick={() => {
                      markAsRead(selectedContact.id);
                      setSelectedContact(null);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Mark as Read
                  </button>
                )}
                {selectedContact.status !== "replied" && (
                  <button
                    onClick={() => {
                      markAsReplied(selectedContact.id);
                      setSelectedContact(null);
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Mark as Replied
                  </button>
                )}
                {selectedContact.status !== "archived" && (
                  <button
                    onClick={() => {
                      archiveContact(selectedContact.id);
                      setSelectedContact(null);
                    }}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Archive
                  </button>
                )}
                <button
                  onClick={() => {
                    setContactToDelete(selectedContact.id);
                    setShowDeleteModal(true);
                    setSelectedContact(null);
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <FiTrash2 className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                Delete Contact
              </h3>
            </div>

            <p className="text-gray-600 mb-6">
              {contactToDelete === "bulk"
                ? `Are you sure you want to delete ${selectedContacts.length} selected contact(s)? This action cannot be undone.`
                : "Are you sure you want to delete this contact? This action cannot be undone."}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setContactToDelete(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (contactToDelete === "bulk") {
                    selectedContacts.forEach((id) => deleteContact(id));
                  } else if (contactToDelete) {
                    deleteContact(contactToDelete);
                  }
                }}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
