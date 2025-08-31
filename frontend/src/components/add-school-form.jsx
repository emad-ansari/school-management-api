import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
	Plus,
	Loader2,
	CheckCircle,
	AlertCircle,
	ChevronsUpDownIcon,
	CheckIcon,
} from "lucide-react";
import { apiService } from "../services/api";
import { cn } from "../lib/utils";
import { statesOfIndia, citisOfState } from "../lib/types";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "../components/ui/command";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "../components/ui/popover";

const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const cloudinary_url = import.meta.env.VITE_CLOUDINARY_URL;



export function AddSchoolForm() {
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState({ type: "", text: "" });
	const [formData, setFormData] = useState({
		schoolName: "",
		address: "",
		state: "",
		city: "",
		email: "",
		pictureUrl: null,
	});

	// Separate state for state and city dropdowns
	const [stateOpen, setStateOpen] = useState(false);
	const [cityOpen, setCityOpen] = useState(false);
	const [selectedState, setSelectedState] = useState(null);
	const [cities, setCities] = useState([])
	const [selectedCity, setSelectedCity] = useState(null);

	console.log('form data: ', formData);
	
	
	useEffect(() => {
		if (selectedState) {
			setCities(citisOfState[`${selectedState.label}`]);
		}
	}, [selectedState])

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setMessage({ type: "", text: "" });

		try {
			const result = await apiService.addSchool(formData);
			setMessage({
				type: "success",
				text: `School "${formData.schoolName}" added successfully!`,
			});

			// Reset form
			setFormData({
				schoolName: "",
				address: "",
				state: "",
				city: "",
				email: "",
				picture: null,
			});
			setSelectedState("");
			setSelectedCity("");
		} catch (error) {
			setMessage({
				type: "error",
				text: error.message || "Failed to add school",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleInputChange = (field, value) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleStateSelect = (stateValue) => {
		setSelectedState(stateValue);
		setFormData((prev) => ({ ...prev, state: stateValue.label }));
		setStateOpen(false);

	};
	const handleCitySelect = (cityValue) => {
		setSelectedCity(cityValue);
		setFormData((prev) => ({ ...prev, city: cityValue }));
		setCityOpen(false);
	};

	const handleFileUpload = async (event) => {
		const file = event.target.files?.[0];
		if (!file) return;
		console.log('this is file: ', file);
		const newFormData = new FormData();
		newFormData.append("file", file);
		newFormData.append("upload_preset", uploadPreset);
		setFormData(newFormData);

		try {	
			const uploadResponse = await fetch(cloudinary_url, {
				method: "POST",
				body: newFormData,
			})
			if (!uploadResponse.ok) {
				throw new Error("Failed to uplaod the image!!");
			}

			const data = await uploadResponse.json();
			setFormData((prev) => ({ ...prev, pictureUrl: data.secure_url }));
		}
		catch(error) {
			console.log('upload error: ', error);
			throw new Error("UPLOAD_IMAGE_ERROR: ", error);
		}
	};
	

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<div className="space-y-2">
				<Label
					htmlFor="schoolName"
					className="text-sm font-medium text-foreground"
				>
					School Name
				</Label>
				<Input
					id="schoolName"
					type="text"
					placeholder="Enter school name"
					value={formData.schoolName}
					onChange={(e) =>
						handleInputChange("schoolName", e.target.value)
					}
					className="bg-input border-border focus:ring-2 focus:ring-ring focus:border-transparent"
					required
				/>
			</div>

			<div className="space-y-2">
				<Label
					htmlFor="address"
					className="text-sm font-medium text-foreground"
				>
					Address
				</Label>
				<Textarea
					id="address"
					placeholder="School address"
					value={formData.address}
					onChange={(e) =>
						handleInputChange("address", e.target.value)
					}
					className="bg-input border-border focus:ring-2 focus:ring-ring focus:border-transparent min-h-[80px] resize-none"
					required
				/>
			</div>

			<div className="space-y-2">
				<Label
					htmlFor="state"
					className="text-sm font-medium text-foreground"
				>
					State
				</Label>
				<Popover open={stateOpen} onOpenChange={setStateOpen}>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							role="combobox"
							aria-expanded={stateOpen}
							className="w-full justify-between bg-input text-foreground border-border focus:ring-2 focus:ring-ring focus:border-transparent hover:bg-input hover:text-foreground"
						>
							{
							selectedState
								? selectedState.label
								: "Select State"
							}
							<ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-full p-0" align="start">
						<Command className="bg-popover text-popover-foreground">
							<CommandInput placeholder="Search state..." className="text-foreground" />
							<CommandList>
								<CommandEmpty className="text-muted-foreground">No state found.</CommandEmpty>
								<CommandGroup>
									{statesOfIndia.map((state) => (
										<CommandItem
											key={state.value}
											value={state.label}
											onSelect={() => handleStateSelect(state)}
											className={cn(
												"text-foreground hover:!bg-primary hover:!text-primary-foreground cursor-pointer px-3 py-2 flex items-center",
												selectedState?.value === state.value && "!bg-primary/90 !text-primary-foreground"
											)}
										>
											<CheckIcon
												className={cn(
													"mr-2 h-4 w-4",
													selectedState?.value === state.value
														? "opacity-100"
														: "opacity-0"
												)}
											/>
											{state.label}
										</CommandItem>
									))}
								</CommandGroup>
							</CommandList>
						</Command>
					</PopoverContent>
				</Popover>
			</div>

			<div className="space-y-2">
				<Label
					htmlFor="city"
					className="text-sm font-medium text-foreground"
				>
					City
				</Label>
				<Popover open={cityOpen} onOpenChange={setCityOpen}>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							role="combobox"
							aria-expanded={cityOpen}
							className="w-full justify-between bg-input text-foreground border-border focus:ring-2 focus:ring-ring focus:border-transparent hover:bg-input hover:text-foreground"
						>
							{selectedCity ? selectedCity : "Select City"}
							<ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-full p-0" align="start">
						<Command className="bg-popover text-popover-foreground rounded-md">
							<CommandInput placeholder="Search city..." className="text-foreground outline-none" />
							<CommandList className="max-h-[200px]">
								<CommandEmpty className="text-muted-foreground py-4">No city found.</CommandEmpty>
								<CommandGroup>
									{cities && cities.map((city) => (
										<CommandItem
											key={city}
											value={city}
											onSelect={handleCitySelect}
											className={cn(
												"text-foreground hover:!bg-primary/90 hover:!text-primary-foreground cursor-pointer px-3 py-2 flex items-center",
												selectedCity === city && "!bg-primary/90 !text-primary-foreground"
											)}
										>
											<CheckIcon
												className={cn(
													"mr-2 h-4 w-4",
													selectedCity === city
														? "opacity-100"
														: "opacity-0"
												)}
											/>
											{city}
										</CommandItem>
									))}
								</CommandGroup>
							</CommandList>
						</Command>
					</PopoverContent>
				</Popover>
			</div>

			<div className="space-y-2">
				<Label
					htmlFor="email"
					className="text-sm font-medium text-foreground"
				>
					Email
				</Label>
				<Input
					id="email"
					type="email"
					placeholder="Enter school email"
					value={formData.email}
					onChange={(e) =>
						handleInputChange("email", e.target.value)
					}
					className="bg-input border-border focus:ring-2 focus:ring-ring focus:border-transparent"
					required
				/>
			</div>

			<div className="space-y-2">
				<Label
					htmlFor="picture"
					className="text-sm font-medium text-foreground"
				>
					School Picture
				</Label>
				<Input
					id="picture"
					type="file"
					accept="image/*"
					onChange={(e) => handleFileUpload(e)}
					className="border-border focus:ring-2 focus:ring-ring focus:border-transparent file:mr-2  file:px-2 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 file:text-center"
				/>
			</div>

			<Button
				type="submit"
				className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium "
				disabled={isLoading}
			>
				{isLoading ? (
					<>
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						Adding School...
					</>
				) : (
					<>
						<Plus className="mr-2 h-4 w-4" />
						Add School
					</>
				)}
			</Button>

			{/* Message Display */}
			{message.text && (
				<div
					className={`mt-4 p-3 rounded-lg flex items-center gap-2 ${
						message.type === "success"
							? "bg-green-50 border border-green-200 text-green-800"
							: "bg-red-50 border border-red-200 text-red-800"
					}`}
				>
					{message.type === "success" ? (
						<CheckCircle className="h-4 w-4" />
					) : (
						<AlertCircle className="h-4 w-4" />
					)}
					<span className="text-sm font-medium">{message.text}</span>
				</div>
			)}
		</form>
	);
}
