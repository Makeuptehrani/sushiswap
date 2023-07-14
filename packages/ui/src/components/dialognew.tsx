'use client'

import { XMarkIcon } from '@heroicons/react/24/solid'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Chain, ChainId } from '@sushiswap/chain'
import * as React from 'react'
import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

import { Button, classNames, Dots, IconButton, Loader } from '../index'
import { CheckMarkIcon } from './icons/CheckmarkIcon'
import { FailedMarkIcon } from './icons/FailedMarkIcon'

const DialogNew = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogClose = DialogPrimitive.Close

const DialogPortal = ({ className, children, ...props }: DialogPrimitive.DialogPortalProps) => (
  <DialogPrimitive.Portal className={classNames(className)} {...props}>
    <div className="fixed inset-0 z-[1081] flex items-start justify-center sm:items-center">{children}</div>
  </DialogPrimitive.Portal>
)
DialogPortal.displayName = DialogPrimitive.Portal.displayName

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={classNames(
      'fixed inset-0 z-50 bg-black/10 backdrop-blur-sm transition-all duration-100 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in',
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={classNames(
        'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 bg-gray-100 dark:bg-slate-800 p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-2xl md:w-full',
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close asChild className="absolute right-6 top-6">
        <IconButton icon={XMarkIcon} name="Close" />
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={classNames('flex flex-col space-y-1.5 text-center sm:text-left', className)} {...props} />
)
DialogHeader.displayName = 'DialogHeader'

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={classNames('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} {...props} />
)
DialogFooter.displayName = 'DialogFooter'

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={classNames('text-lg font-semibold leading-none tracking-tight mr-[64px]', className)}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={classNames('text-sm text-muted-foreground mr-[64px]', className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

interface DialogReviewProps
  extends Omit<React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root>, 'children' | 'open'> {
  children: ({ confirm }: { confirm(): void }) => ReactNode
}

const DialogReview: FC<DialogReviewProps> = ({ children, ...props }) => {
  const { confirm, open, setOpen } = useDialog(DialogType.Review)
  return (
    <DialogNew {...props} open={open} onOpenChange={setOpen}>
      {children({ confirm })}
    </DialogNew>
  )
}
DialogReview.displayName = 'DialogReview'

interface DialogConfirmProps
  extends Omit<React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root>, 'children' | 'open'> {
  chainId: ChainId
  testId: string
  successMessage: ReactNode
  buttonLink?: string
  buttonText?: string
  txHash: string | undefined
  status: 'idle' | 'loading' | 'success' | 'error'
}

const DialogConfirm: FC<DialogConfirmProps> = ({
  chainId,
  testId,
  successMessage,
  buttonText = 'Close',
  buttonLink,
  status,
  txHash,
  ...props
}) => {
  const { open, setOpen } = useDialog(DialogType.Confirm)

  return (
    <DialogNew {...props} open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {status === 'loading' ? <Dots>Confirming</Dots> : status === 'success' ? 'Success!' : 'Oops!'}
          </DialogTitle>
          <DialogDescription className="font-medium">
            {status === 'loading' ? (
              <>
                Waiting for your{' '}
                <a
                  target="_blank"
                  href={txHash ? Chain.from(chainId).getTxUrl(txHash) : ''}
                  className="cursor-pointer text-blue hover:underline"
                  rel="noreferrer"
                >
                  transaction
                </a>{' '}
                to be confirmed on the blockchain.
              </>
            ) : status === 'success' ? (
              <a
                target="_blank"
                href={txHash ? Chain.from(chainId).getTxUrl(txHash) : ''}
                className="cursor-pointer text-blue hover:underline"
                rel="noreferrer"
              >
                {successMessage}
              </a>
            ) : (
              <a
                target="_blank"
                href={txHash ? Chain.from(chainId).getTxUrl(txHash) : ''}
                className="cursor-pointer text-blue hover:underline"
                rel="noreferrer"
              >
                Something went wrong...
              </a>
            )}
          </DialogDescription>
          <div className="py-6 flex justify-center">
            {status === 'loading' ? (
              <Loader size={132} strokeWidth={1} className="!text-blue" />
            ) : status === 'success' ? (
              <CheckMarkIcon width={132} height={132} />
            ) : (
              <FailedMarkIcon width={132} height={132} />
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button testId={testId} asChild={!!buttonLink} fullWidth size="xl">
                {buttonLink ? <a href={buttonLink}>{buttonText}</a> : <>{buttonText}</>}
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </DialogNew>
  )
}
DialogConfirm.displayName = 'DialogConfirm'

export enum DialogType {
  Review,
  Confirm,
}

interface DialogContext {
  state: Record<DialogType, boolean>
  confirm(): void
  setState: Dispatch<SetStateAction<Record<DialogType, boolean>>>
}

const DialogContext = createContext<DialogContext | undefined>(undefined)

interface DialogProviderProps {
  children: ReactNode
}

const DialogProvider: FC<DialogProviderProps> = ({ children }) => {
  const [state, setState] = useState<Record<DialogType, boolean>>({
    [DialogType.Review]: false,
    [DialogType.Confirm]: false,
  })

  const confirm = useCallback(() => {
    setState({
      [DialogType.Review]: false,
      [DialogType.Confirm]: true,
    })
  }, [])

  return <DialogContext.Provider value={{ state, confirm, setState }}>{children}</DialogContext.Provider>
}

type UseDialog<T> = T extends DialogType.Review
  ? {
      open: boolean
      setOpen(open: boolean): void
      confirm(): void
    }
  : {
      open: boolean
      setOpen(open: boolean): void
    }

const useDialog = <T extends DialogType>(type: T): UseDialog<T> => {
  const context = useContext(DialogContext)
  if (!context) {
    throw new Error('Hook can only be used inside Modal Context')
  }

  return useMemo(() => {
    if (type === DialogType.Review) {
      return {
        open: Boolean(context.state[type]),
        setOpen: (val) => context.setState((prev) => ({ ...prev, [DialogType.Review]: val })),
        confirm: context.confirm,
      } as UseDialog<T>
    } else {
      return {
        open: Boolean(context.state[type]),
        setOpen: (val) => context.setState((prev) => ({ ...prev, [DialogType.Confirm]: val })),
      } as UseDialog<T>
    }
  }, [context, type])
}

export {
  DialogClose,
  DialogConfirm,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogNew,
  DialogProvider,
  DialogReview,
  DialogTitle,
  DialogTrigger,
  useDialog,
}
