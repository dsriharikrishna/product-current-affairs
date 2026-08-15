from apscheduler.schedulers.asyncio import AsyncIOScheduler

# We keep a global instance of the scheduler
scheduler = AsyncIOScheduler()

def start_scheduler():
    if not scheduler.running:
        scheduler.start()

def stop_scheduler():
    if scheduler.running:
        scheduler.shutdown()
