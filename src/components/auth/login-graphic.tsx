export function LoginGraphic() {
    return (
      <div className="relative h-full w-full overflow-hidden">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-[#FF8C42]" />
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-[#4F86F7] origin-bottom-right" style={{ transform: 'rotate(90deg)' }} />
  
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-[#FFC857]" />
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-[#4F86F7] origin-top-left" style={{ transform: 'rotate(90deg)' }}/>
  
        <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-[#4F86F7]" />
        <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-[#FF8C42] origin-bottom-left" style={{ transform: 'rotate(90deg)' }} />
  
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-[#FF8C42]" />
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-[#FFC857] origin-top-right" style={{ transform: 'rotate(90deg)' }} />

        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-[#FFC857] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-br-full bg-[#E53D00] -translate-x-1/2 -translate-y-1/2" />
      </div>
    );
  }
  