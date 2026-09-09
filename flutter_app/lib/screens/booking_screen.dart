import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../app_state.dart';
import '../data/rooms.dart';
import '../theme.dart';

class BookingScreen extends StatefulWidget {
  final String? preselectedRoomId;

  /// When true the screen is shown inside the bottom-nav shell (no own AppBar).
  /// When false it's a pushed route and provides its own Scaffold + back button.
  final bool embedded;

  const BookingScreen({super.key, this.preselectedRoomId, this.embedded = false});

  @override
  State<BookingScreen> createState() => _BookingScreenState();
}

class _BookingScreenState extends State<BookingScreen> {
  final _formKey = GlobalKey<FormState>();
  final _name = TextEditingController();
  final _email = TextEditingController();
  final _phone = TextEditingController();

  late String _roomId;
  int _guests = 2;
  String _payment = 'click';
  DateTime? _checkIn;
  DateTime? _checkOut;
  bool _submitting = false;

  final _fmt = DateFormat('yyyy-MM-dd');

  @override
  void initState() {
    super.initState();
    _roomId = widget.preselectedRoomId ?? kRooms.first.id;
    final now = DateTime.now();
    _checkIn = DateTime(now.year, now.month, now.day + 1);
    _checkOut = DateTime(now.year, now.month, now.day + 3);
  }

  int get _nights =>
      (_checkIn != null && _checkOut != null) ? _checkOut!.difference(_checkIn!).inDays : 0;

  int get _total {
    final room = kRooms.firstWhere((r) => r.id == _roomId);
    return room.price * (_nights > 0 ? _nights : 1);
  }

  Future<void> _pickDate({required bool checkIn}) async {
    final base = checkIn ? _checkIn! : _checkOut!;
    final first = checkIn ? DateTime.now() : _checkIn!.add(const Duration(days: 1));
    final picked = await showDatePicker(
      context: context,
      initialDate: base.isBefore(first) ? first : base,
      firstDate: first,
      lastDate: DateTime.now().add(const Duration(days: 720)),
      builder: (context, child) => Theme(
        data: Theme.of(context).copyWith(
          colorScheme: const ColorScheme.light(primary: AppColors.gold, onPrimary: AppColors.navy),
        ),
        child: child!,
      ),
    );
    if (picked != null) {
      setState(() {
        if (checkIn) {
          _checkIn = picked;
          if (_checkOut!.isBefore(picked.add(const Duration(days: 1)))) {
            _checkOut = picked.add(const Duration(days: 1));
          }
        } else {
          _checkOut = picked;
        }
      });
    }
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;
    setState(() => _submitting = true);
    final state = AppScope.of(context);
    try {
      final booking = await state.api.createBooking(
        name: _name.text.trim(),
        email: _email.text.trim(),
        phone: _phone.text.trim(),
        checkIn: _fmt.format(_checkIn!),
        checkOut: _fmt.format(_checkOut!),
        guests: _guests,
        roomType: _roomId,
        paymentMethod: _payment,
      );
      if (!mounted) return;
      await state.refreshAvailability();
      if (!mounted) return;
      _showSuccess(booking);
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          backgroundColor: Colors.red.shade700,
          content: Text('Booking failed. Is the server running?\n$e',
              maxLines: 3, overflow: TextOverflow.ellipsis),
        ),
      );
    } finally {
      if (mounted) setState(() => _submitting = false);
    }
  }

  void _showSuccess(Map<String, dynamic> booking) {
    showDialog(
      context: context,
      builder: (_) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(18)),
        title: Row(
          children: [
            const Icon(Icons.check_circle, color: AppColors.gold),
            const SizedBox(width: 10),
            Text('Reserved!', style: Theme.of(context).textTheme.titleLarge),
          ],
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Confirmation: ${booking['id'] ?? '—'}',
                style: const TextStyle(fontWeight: FontWeight.w600)),
            const SizedBox(height: 6),
            Text('Total: \$${booking['totalPrice'] ?? _total}'),
            const SizedBox(height: 6),
            const Text('Status: pending — our concierge will confirm shortly.',
                style: TextStyle(color: AppColors.slate, fontSize: 13)),
          ],
        ),
        actions: [
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context); // dialog
              Navigator.maybePop(context); // back
            },
            child: const Text('DONE'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final form = Form(
        key: _formKey,
        child: ListView(
          padding: const EdgeInsets.all(20),
          children: [
            _label('Full name'),
            TextFormField(
              controller: _name,
              decoration: const InputDecoration(hintText: 'e.g. Aziz Karimov'),
              validator: (v) => (v == null || v.trim().isEmpty) ? 'Required' : null,
            ),
            _label('Email'),
            TextFormField(
              controller: _email,
              keyboardType: TextInputType.emailAddress,
              decoration: const InputDecoration(hintText: 'you@example.com'),
              validator: (v) =>
                  (v == null || !v.contains('@')) ? 'Valid email required' : null,
            ),
            _label('Phone'),
            TextFormField(
              controller: _phone,
              keyboardType: TextInputType.phone,
              decoration: const InputDecoration(hintText: '+998 ...'),
              validator: (v) => (v == null || v.trim().length < 7) ? 'Required' : null,
            ),
            _label('Room / Suite'),
            DropdownButtonFormField<String>(
              initialValue: _roomId,
              items: kRooms
                  .map((r) => DropdownMenuItem(
                        value: r.id,
                        child: Text('${r.localizedName('en')} — \$${r.price}',
                            overflow: TextOverflow.ellipsis),
                      ))
                  .toList(),
              onChanged: (v) => setState(() => _roomId = v!),
            ),
            Row(
              children: [
                Expanded(child: _dateField('Check-in', _checkIn!, () => _pickDate(checkIn: true))),
                const SizedBox(width: 12),
                Expanded(child: _dateField('Check-out', _checkOut!, () => _pickDate(checkIn: false))),
              ],
            ),
            _label('Guests'),
            Row(
              children: [
                _stepBtn(Icons.remove, () {
                  if (_guests > 1) setState(() => _guests--);
                }),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 20),
                  child: Text('$_guests',
                      style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w700)),
                ),
                _stepBtn(Icons.add, () {
                  if (_guests < 10) setState(() => _guests++);
                }),
              ],
            ),
            _label('Payment method'),
            Wrap(
              spacing: 8,
              children: ['click', 'payme', 'visa', 'cash']
                  .map((m) => ChoiceChip(
                        label: Text(m.toUpperCase()),
                        selected: _payment == m,
                        selectedColor: AppColors.navy,
                        labelStyle: TextStyle(
                          color: _payment == m ? AppColors.gold : AppColors.slate,
                          fontWeight: FontWeight.w600,
                        ),
                        onSelected: (_) => setState(() => _payment = m),
                      ))
                  .toList(),
            ),
            const SizedBox(height: 24),
            Container(
              padding: const EdgeInsets.all(18),
              decoration: BoxDecoration(
                color: AppColors.navy,
                borderRadius: BorderRadius.circular(14),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('$_nights night${_nights == 1 ? '' : 's'}',
                          style: const TextStyle(color: Colors.white70, fontSize: 13)),
                      const SizedBox(height: 4),
                      Text('\$$_total',
                          style: const TextStyle(
                              color: AppColors.gold, fontSize: 26, fontWeight: FontWeight.w800)),
                    ],
                  ),
                  ElevatedButton(
                    onPressed: _submitting ? null : _submit,
                    child: _submitting
                        ? const SizedBox(
                            width: 20, height: 20,
                            child: CircularProgressIndicator(strokeWidth: 2, color: AppColors.navy))
                        : const Text('CONFIRM'),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),
          ],
        ),
      );

    if (widget.embedded) return form;
    return Scaffold(
      appBar: AppBar(title: const Text('BOOK YOUR STAY')),
      body: form,
    );
  }

  Widget _label(String t) => Padding(
        padding: const EdgeInsets.fromLTRB(2, 18, 0, 8),
        child: Text(t,
            style: const TextStyle(fontWeight: FontWeight.w600, color: AppColors.navy)),
      );

  Widget _dateField(String label, DateTime value, VoidCallback onTap) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _label(label),
        InkWell(
          onTap: onTap,
          child: InputDecorator(
            decoration: const InputDecoration(),
            child: Row(
              children: [
                const Icon(Icons.calendar_today, size: 16, color: AppColors.goldDeep),
                const SizedBox(width: 10),
                Text(_fmt.format(value)),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _stepBtn(IconData icon, VoidCallback onTap) => Material(
        color: Colors.white,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10),
          side: const BorderSide(color: Color(0xFFE2E8F0)),
        ),
        child: InkWell(
          onTap: onTap,
          borderRadius: BorderRadius.circular(10),
          child: Padding(padding: const EdgeInsets.all(12), child: Icon(icon, color: AppColors.navy)),
        ),
      );
}
