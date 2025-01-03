export default function NotFound() {
    return (
      <div className="space-y-8">
        <div className="space-y-2">
          <p className="text-sm italic text-muted-foreground">
            404
          </p>
          <h1 className="text-base font-semibold">
            Page not found
          </h1>
        </div>
        
        <p className="text-sm text-muted-foreground leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>
    );
  }