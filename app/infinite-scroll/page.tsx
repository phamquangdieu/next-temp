'use client';
import React, { useEffect, useState, useRef } from "react";
import InfiniteScroll from "react-infinite-scroller";

const PAGE_SIZE = 30;
const TOTAL_MESSAGES = 50000;
const BUFFER_PAGES = 1; // Number of pages to load before and after target page

interface Message {
    id: number;
    text: string;
}

const fetchMessages = async (page: number): Promise<Message[]> => {
    const start = TOTAL_MESSAGES - (page + 1) * PAGE_SIZE;
    const messages: Message[] = Array.from({ length: PAGE_SIZE }, (_, i) => {
        const id = start + i;
        return { id, text: `Message #${id}` };
    });
    // Add a small delay to simulate network latency
    await new Promise(resolve => setTimeout(resolve, 300));
    return messages;
};

// Helper to calculate which page contains a specific message ID
const getPageForMessageId = (messageId: number): number => {
    return Math.floor((TOTAL_MESSAGES - 1 - messageId) / PAGE_SIZE);
};

export default function ChatApp() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [jumpTargetIndex, setJumpTargetIndex] = useState<number | null>(null);
  const [isJumping, setIsJumping] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Load more messages when scrolling
  const loadMore = async (page: number) => {
    // Skip if we're jumping to a specific message
    if (isJumping) return;
    
    const newMessages = await fetchMessages(page);
    setMessages(prev => [...prev, ...newMessages.reverse()]);
    setCurrentPage(page);
    
    if ((page + 1) * PAGE_SIZE >= TOTAL_MESSAGES) {
      setHasMore(false);
    }
  };

  // Jump to specific message by loading that page and surrounding pages
  const jumpToMessage = async (targetIndex: number) => {
    setIsJumping(true);
    setLoadingProgress(0);
    
    // Reset state
    setMessages([]);
    setHasMore(true);
    
    // Calculate the target page
    const targetPage = getPageForMessageId(targetIndex);
    
    // Load the target page first to show content quickly
    await fetchMessages(targetPage).then(newMessages => {
      setMessages(newMessages.reverse());
      setLoadingProgress(50);
    });
    
    // Set the current page to continue loading from this point
    setCurrentPage(targetPage);
    
    setLoadingProgress(100);
    setJumpTargetIndex(targetIndex);
    setIsJumping(false);
  };

  // Scroll to the message ref after it's loaded
  useEffect(() => {
    if (jumpTargetIndex == null) return;
    
    const el = document.getElementById(`message-${jumpTargetIndex}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      setJumpTargetIndex(null);
    }
  }, [messages, jumpTargetIndex]);

  return (
    <div>
      <div className="controls" style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
        <button 
          onClick={() => jumpToMessage(42134)} 
          disabled={isJumping}
          style={{
            padding: '8px 16px',
            backgroundColor: isJumping ? '#cccccc' : '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isJumping ? 'not-allowed' : 'pointer'
          }}
        >
          {isJumping ? 'Jumping...' : 'Jump to Message #42134'}
        </button>
        
        {isJumping && (
          <div style={{ marginLeft: '15px', display: 'flex', alignItems: 'center' }}>
            <div className="spinner" style={{
              width: '24px',
              height: '24px',
              border: '3px solid rgba(0, 0, 0, 0.1)',
              borderRadius: '50%',
              borderTop: '3px solid #0070f3',
              animation: 'spin 1s linear infinite',
              marginRight: '10px'
            }}></div>
            <div>Loading {loadingProgress}%</div>
          </div>
        )}
        
        <div style={{ marginLeft: '20px' }}>
          <input 
            type="number"
            placeholder="Enter message ID"
            style={{ padding: '8px', width: '150px' }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const target = parseInt((e.target as HTMLInputElement).value);
                if (!isNaN(target) && target >= 0 && target < TOTAL_MESSAGES) {
                  jumpToMessage(target);
                }
              }
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0% { opacity: 0.3; }
          50% { opacity: 1; }
          100% { opacity: 0.3; }
        }
      `}</style>

      <div ref={scrollContainerRef} style={{ height: 600, overflow: "auto" }}>
        <InfiniteScroll
          pageStart={currentPage}
          loadMore={loadMore}
          hasMore={hasMore && !isJumping}
          useWindow={false}
          getScrollParent={() => scrollContainerRef.current}
          loader={
            <div key={"loader"} style={{
              padding: '15px',
              textAlign: 'center',
              animation: 'pulse 1.5s infinite ease-in-out'
            }}>
              <div style={{
                display: 'inline-block',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                border: '3px solid rgba(0, 112, 243, 0.2)',
                borderTop: '3px solid #0070f3',
                animation: 'spin 1s linear infinite'
              }}></div>
              <div style={{ marginTop: '8px' }}>Loading messages...</div>
            </div>
          }
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              id={`message-${msg.id}`}
              style={{
                padding: "10px",
                borderBottom: "1px solid #eee",
                backgroundColor: jumpTargetIndex === msg.id ? '#fffbea' : 'transparent',
                transition: 'background-color 0.5s ease-in-out'
              }}
            >
              {msg.text}
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}
